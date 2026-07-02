// scripts/auto-post.js
// Runs nightly via GitHub Actions.
// Picks one unused post per channel from the pool and writes it directly
// to the approved Redis key on each site — bypassing the moderation queue.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { randomUUID } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
  console.error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN");
  process.exit(1);
}

// ── Hijri year helper (mirrors lib/hijri.js on the MLF site) ──────────────
function gregorianToHijri(year, month, day) {
  const jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4)
    + Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12)
    - Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4)
    + day - 32075;
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719)
    + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50)
    - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hijriMonth = Math.floor((24 * l3) / 709);
  const hijriYear = 30 * n + j - 30 + Math.floor((hijriMonth + 1) / 13);
  return hijriYear;
}

function currentHijriYear() {
  const now = new Date();
  return gregorianToHijri(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function currentMonthKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// ── Redis helpers ─────────────────────────────────────────────────────────
// Use Upstash command-in-body format to avoid Node.js 24's URL parser
// encoding colons in path segments (autopost:used:x → autopost%3Aused%3Ax)
async function redisCmd(...args) {
  const r = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  return r.json();
}

async function redisGet(key) {
  const data = await redisCmd("GET", key);
  if (!data.result) return [];
  try {
    let parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
    // Handle old double-wrapped format: { value: "[...]" }
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && typeof parsed.value === "string") {
      parsed = JSON.parse(parsed.value);
    }
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function redisSet(key, value) {
  const data = await redisCmd("SET", key, JSON.stringify(value));
  if (!data.result || data.result !== "OK") {
    throw new Error(`Redis SET failed for "${key}": ${JSON.stringify(data)}`);
  }
}

// ── Post selection ────────────────────────────────────────────────────────
function pickUnused(pool, usedIds) {
  const usedSet = new Set(usedIds || []);
  const available = pool.filter((p) => !usedSet.has(p.id));

  // If all posts have been used, reset and start over
  if (available.length === 0) {
    console.log("  Pool exhausted — resetting used list.");
    return { post: pool[Math.floor(Math.random() * pool.length)], reset: true };
  }

  const post = available[Math.floor(Math.random() * available.length)];
  return { post, reset: false };
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const pool = JSON.parse(readFileSync(join(__dirname, "posts-pool.json"), "utf8"));

  const monthKey  = currentMonthKey();
  const hijriYear = currentHijriYear();

  const channels = [
    {
      name:        "testimonials",
      poolKey:     "testimonials",
      approvedKey: "testimonials:approved",
      usedKey:     "autopost:used:testimonials",
    },
    {
      name:        "monthly-fast",
      poolKey:     "fast",
      approvedKey: `fastcomments:approved:${monthKey}`,
      usedKey:     "autopost:used:fast",
    },
    {
      name:        "ramadan",
      poolKey:     "ramadan",
      approvedKey: `ramadancomments:approved:${hijriYear}`,
      usedKey:     "autopost:used:ramadan",
    },
    {
      name:        "consulate",
      poolKey:     "consulate",
      approvedKey: "consulate:approved",
      usedKey:     "autopost:used:consulate",
    },
  ];

  for (const ch of channels) {
    console.log(`\n[${ch.name}]`);
    try {
      const channelPool = pool[ch.poolKey];
      if (!channelPool?.length) {
        console.log("  No posts in pool — skipping.");
        continue;
      }

      // Get used IDs
      const usedIds = (await redisGet(ch.usedKey)) || [];
      console.log(`  Pool: ${channelPool.length} | Used: ${usedIds.length}`);

      const { post, reset } = pickUnused(channelPool, usedIds);

      // Stamp today's date
      const entry = { ...post, date: new Date().toISOString() };

      // Append to approved list
      const approved = (await redisGet(ch.approvedKey)) || [];
      const updatedApproved = Array.isArray(approved) ? [...approved, entry] : [entry];
      await redisSet(ch.approvedKey, updatedApproved);

      // Update used list
      const updatedUsed = reset ? [post.id] : [...usedIds, post.id];
      await redisSet(ch.usedKey, updatedUsed);

      console.log(`  ✓ Posted: "${entry.text.slice(0, 80)}..."`);
    } catch (err) {
      console.error(`  ✗ Error on [${ch.name}]:`, err.message);
    }
  }

  console.log("\nDone.");
}

main();
