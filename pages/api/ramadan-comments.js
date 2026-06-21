// pages/api/ramadan-comments.js
// GET  -> returns approved comments for the current/upcoming Hijri year's Ramadan
// POST -> submits a comment into that year's pending queue + notifies admin
import crypto from "crypto";
import { notifyAdmin } from "../../lib/notifyAdmin";
import { getRamadanWindow } from "../../lib/hijri";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet(key) {
  const r = await fetch(`${redisUrl}/get/${key}`, { headers: { Authorization: `Bearer ${redisToken}` } });
  const data = await r.json();
  return data.result ? JSON.parse(data.result) : [];
}

async function redisSet(key, value) {
  await fetch(`${redisUrl}/set/${key}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ value: JSON.stringify(value) }),
  });
}

export default async function handler(req, res) {
  const { hijriYear, start, end } = getRamadanWindow();
  const now = new Date();
  const isActive = now >= start && now <= end;

  if (req.method === "GET") {
    const approved = await redisGet(`ramadancomments:approved:${hijriYear}`);
    return res.status(200).json({ hijriYear, start, end, isActive, comments: approved });
  }

  if (req.method === "POST") {
    const { name, text } = req.body;
    if (!name || !text || !name.trim() || !text.trim()) {
      return res.status(400).json({ error: "Name and message are required." });
    }
    const pending = await redisGet(`ramadancomments:pending:${hijriYear}`);
    const entry = { id: crypto.randomUUID(), name: name.trim(), text: text.trim(), date: new Date().toISOString() };
    pending.push(entry);
    await redisSet(`ramadancomments:pending:${hijriYear}`, pending);

    try {
      await notifyAdmin({
        subject: `New Ramadan page comment pending (${hijriYear} AH)`,
        itemType: "Ramadan comment",
        preview: `${entry.name} wrote: "${entry.text.slice(0, 140)}${entry.text.length > 140 ? "..." : ""}"`,
      });
    } catch (e) {
      console.error("Admin notification failed:", e);
    }

    return res.status(200).json({ submitted: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
