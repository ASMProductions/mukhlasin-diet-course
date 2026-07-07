// pages/api/auth.js — course access for Mastery Level Fasting
// POST { email } -> if paid (paid:{email}), email a magic link
// GET  ?token=x  -> validate one-time login token, set cookie, redirect /
// Sessions: mlf:session:{token} -> email, 30-day expiry.
// Session index: mlf:sessions:{email} -> set of session tokens (for refund revocation).
// Uses raw Upstash fetch (command-in-body) per established pattern.

import nodemailer from "nodemailer";
import crypto from "crypto";

const SITE = "https://www.masterylevelfasting.com";
const SESSION_DAYS = 30;

async function redis(cmd) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error("Redis request failed");
  const data = await r.json();
  return data.result;
}

function newToken() {
  return crypto.randomBytes(24).toString("hex");
}

function sessionCookie(token) {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  return `mlf_session=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

export default async function handler(req, res) {
  // ---- Magic-link landing ----
  if (req.method === "GET") {
    const { token } = req.query || {};
    if (!token) return res.redirect("/");
    try {
      const email = await redis(["GETDEL", `mlf:login:${token}`]);
      if (!email) {
        return res.redirect("/?error=expired");
      }
      const session = newToken();
      const ttl = String(SESSION_DAYS * 24 * 60 * 60);
      await redis(["SET", `mlf:session:${session}`, email, "EX", ttl]);
      // Index the session by email so a refund can revoke it instantly
      await redis(["SADD", `mlf:sessions:${email}`, session]);
      await redis(["EXPIRE", `mlf:sessions:${email}`, ttl]);
      res.setHeader("Set-Cookie", sessionCookie(session));
      return res.redirect("/");
    } catch {
      return res.redirect("/?error=server");
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Please enter your email address." });
  }

  const clean = String(email).toLowerCase().trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const paid = await redis(["GET", `paid:${clean}`]);
    // Always answer the same way, so addresses can't be fished.
    if (paid) {
      const token = newToken();
      await redis(["SET", `mlf:login:${token}`, clean, "EX", "900"]); // 15 min
      const link = `${SITE}/api/auth?token=${token}`;

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
        to: clean,
        subject: "Your access link — The Mukhlasin Diet Course",
        text:
          "As salaam alaikum,\n\n" +
          "Here is your sign-in link for the course:\n" +
          link +
          "\n\nThis link works once and expires in 15 minutes. " +
          "Once you sign in, you will stay signed in for 30 days on this device.\n\n" +
          "Mastery Level Fasting\n" + SITE,
        html: `
          <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:2rem;background:#0a0a0a;color:#c8c0b0;border-radius:8px;">
            <div style="text-align:center;margin-bottom:1.5rem;">
              <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a7a5a;margin-bottom:8px;">The Mukhlasin Diet — 4th Edition</div>
              <div style="font-size:22px;color:#8a7a5a;font-family:serif;">الْمُخْلَصِينَ</div>
            </div>
            <p style="color:#c8c0b0;line-height:1.8;">As salaam alaikum. Click the link below to access your course. This link works once and expires in 15 minutes. After you sign in, you will stay signed in for 30 days on this device.</p>
            <div style="text-align:center;margin:2rem 0;">
              <a href="${link}" style="display:inline-block;padding:14px 32px;background:#8a7a5a;color:white;text-decoration:none;border-radius:24px;font-size:15px;font-weight:700;">
                Enter the Course →
              </a>
            </div>
            <p style="font-size:12px;color:#6a6050;text-align:center;">If you did not request this link you can ignore this email.</p>
            <p style="font-size:12px;color:#6a6050;text-align:center;">If the button does not work, copy and paste this link into your browser:<br>${link}</p>
          </div>
        `,
      });
    }
    return res.status(200).json({
      sent: true,
      message:
        "If that email has course access, a sign-in link is on its way. Check your inbox (and spam folder).",
    });
  } catch (err) {
    console.error("MLF auth error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
