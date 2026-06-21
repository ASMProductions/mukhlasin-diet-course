// pages/api/fastcomments.js
// GET  -> returns approved comments for the current month's fast cycle
// POST -> submits a comment into that month's pending queue + notifies admin
import crypto from "crypto";
import { notifyAdmin } from "../../lib/notifyAdmin";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

function currentMonthKey(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

// First Friday of the month, 00:00, through 72 hours later.
function getFastWindow(now = new Date()) {
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const dayOfWeek = first.getDay(); // 0=Sun..6=Sat, Friday=5
  const offset = (5 - dayOfWeek + 7) % 7;
  const firstFriday = new Date(now.getFullYear(), now.getMonth(), 1 + offset);
  const end = new Date(firstFriday.getTime() + 72 * 60 * 60 * 1000);
  return { start: firstFriday, end };
}

async function redisGet(key) {
  const r = await fetch(`${redisUrl}/get/${key}`, { headers: { Authorization: `Bearer ${redisToken}` } });
  const data = await r.json();
  if (!data.result) return [];
  try {
    const parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

async function redisSet(key, value) {
  const r = await fetch(`${redisUrl}/set/${key}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ value: JSON.stringify(value) }),
  });
  const data = await r.json().catch(() => null);
  if (!r.ok || !data || data.result !== "OK") {
    throw new Error(`Redis SET failed for key "${key}": ${r.status} ${JSON.stringify(data)}`);
  }
}

export default async function handler(req, res) {
  const monthKey = currentMonthKey();
  const { start, end } = getFastWindow();
  const isActive = new Date() >= start && new Date() <= end;

  if (req.method === "GET") {
    const approved = await redisGet(`fastcomments:approved:${monthKey}`);
    return res.status(200).json({ monthKey, start, end, isActive, comments: approved });
  }

  if (req.method === "POST") {
    const { name, text } = req.body;
    if (!name || !text || !name.trim() || !text.trim()) {
      return res.status(400).json({ error: "Name and message are required." });
    }
    const pending = await redisGet(`fastcomments:pending:${monthKey}`);
    const entry = { id: crypto.randomUUID(), name: name.trim(), text: text.trim(), date: new Date().toISOString() };
    pending.push(entry);
    await redisSet(`fastcomments:pending:${monthKey}`, pending);

    try {
      await notifyAdmin({
        subject: `New Monthly Fast comment pending (${monthKey})`,
        itemType: "Monthly Fast comment",
        preview: `${entry.name} wrote: "${entry.text.slice(0, 140)}${entry.text.length > 140 ? "..." : ""}"`,
      });
    } catch (e) {
      console.error("Admin notification failed:", e);
    }

    return res.status(200).json({ submitted: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
