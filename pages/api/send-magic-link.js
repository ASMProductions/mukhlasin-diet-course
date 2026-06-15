// pages/api/send-magic-link.js
// Checks if email has paid, sends magic link via HostGator SMTP
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const normalizedEmail = email.toLowerCase().trim();
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Check if email has paid
  const paidRes = await fetch(`${redisUrl}/get/paid:${normalizedEmail}`, {
    headers: { Authorization: `Bearer ${redisToken}` },
  });
  const paidData = await paidRes.json();

  if (!paidData.result) {
    return res.status(200).json({
      sent: false,
      error: "No purchase found for that email. Please use the email you paid with, or enroll below.",
    });
  }

  // Generate one-time token
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

  // Store token in Redis
  await fetch(`${redisUrl}/set/magic:${token}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: `${normalizedEmail}:${expiry}`, ex: 900 }),
  });

  // Send magic link email via HostGator SMTP
  const magicLink = `https://www.masterylevelfasting.com/magic-link?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "gator3251.hostgator.com",
    port: 465,
    secure: true,
    auth: {
      user: "noreply@masterylevelfasting.com",
      pass: process.env.NOREPLY_EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"The Mukhlasin Diet" <noreply@masterylevelfasting.com>',
    to: normalizedEmail,
    subject: "Your access link — The Mukhlasin Diet Course",
    html: `
      <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:2rem;background:#0a0a0a;color:#c8c0b0;border-radius:8px;">
        <div style="text-align:center;margin-bottom:1.5rem;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a7a5a;margin-bottom:8px;">The Mukhlasin Diet — 4th Edition</div>
          <div style="font-size:22px;color:#8a7a5a;font-family:serif;">الْمُخْلَصِينَ</div>
        </div>
        <p style="color:#c8c0b0;line-height:1.8;">As salaam alaikum. Click the link below to access your course. This link expires in 15 minutes and can only be used once.</p>
        <div style="text-align:center;margin:2rem 0;">
          <a href="${magicLink}" style="display:inline-block;padding:14px 32px;background:#8a7a5a;color:white;text-decoration:none;border-radius:24px;font-size:15px;font-weight:700;">
            Enter the Course →
          </a>
        </div>
        <p style="font-size:12px;color:#6a6050;text-align:center;">If you did not request this link you can ignore this email.</p>
        <p style="font-size:12px;color:#6a6050;text-align:center;">If the button does not work, copy and paste this link into your browser:<br>${magicLink}</p>
      </div>
    `,
  });

  return res.status(200).json({ sent: true });
}
