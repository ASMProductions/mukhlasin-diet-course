// pages/api/admin.js
// Gated entirely by ADMIN_TOKEN (set in Vercel env vars — never in this file).
// action=list     -> returns all pending items across testimonials, fast, ramadan
// action=approve  -> moves an item from pending to approved
// action=reject   -> removes an item from pending without approving it
import { getRamadanWindow } from "../../lib/hijri";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet(key) {
  const r = await fetch(`${redisUrl}/get/${key}`, { headers: { Authorization: `Bearer ${redisToken}` } });
  const data = await r.json();
  console.log(`[DEBUG redisGet] key="${key}" status=${r.status} raw=${JSON.stringify(data)}`);
  if (!data.result) return [];
  try {
    const parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.log(`[DEBUG redisGet] JSON.parse failed for key="${key}": ${e.message}`);
    return [];
  }
}

async function redisSet(key, value) {
  await fetch(`${redisUrl}/set/${key}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ value: JSON.stringify(value) }),
  });
}

function currentMonthKey(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function checkToken(req) {
  const token = req.method === "GET" ? req.query.token : req.body.token;
  return token && process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN;
}

export default async function handler(req, res) {
  if (!checkToken(req)) {
    return res.status(401).json({ error: "Invalid or missing admin token." });
  }

  const monthKey = currentMonthKey();
  const { hijriYear } = getRamadanWindow();

  if (req.method === "GET" && req.query.action === "list") {
    const [testimonials, fast, ramadan] = await Promise.all([
      redisGet("testimonials:pending"),
      redisGet(`fastcomments:pending:${monthKey}`),
      redisGet(`ramadancomments:pending:${hijriYear}`),
    ]);
    return res.status(200).json({ testimonials, fast, ramadan, monthKey, hijriYear });
  }

  if (req.method === "POST") {
    const { type, id, action } = req.body;
    if (!type || !id || !action) return res.status(400).json({ error: "Missing type, id, or action." });

    const pendingKey = type === "testimonial" ? "testimonials:pending"
      : type === "fast" ? `fastcomments:pending:${monthKey}`
      : type === "ramadan" ? `ramadancomments:pending:${hijriYear}`
      : null;
    const approvedKey = type === "testimonial" ? "testimonials:approved"
      : type === "fast" ? `fastcomments:approved:${monthKey}`
      : type === "ramadan" ? `ramadancomments:approved:${hijriYear}`
      : null;
    if (!pendingKey) return res.status(400).json({ error: "Unknown type." });

    const pending = await redisGet(pendingKey);
    const item = pending.find((p) => p.id === id);
    const remaining = pending.filter((p) => p.id !== id);
    await redisSet(pendingKey, remaining);

    if (action === "approve" && item) {
      const approved = await redisGet(approvedKey);
      approved.push(item);
      await redisSet(approvedKey, approved);
    }

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
