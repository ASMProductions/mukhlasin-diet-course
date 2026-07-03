// pages/api/lead-magnet.js
import nodemailer from "nodemailer";

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const PDF_URL  = "https://masterylevelfasting.com/precision_eating.pdf";
const LIST_KEY = "leads:precision-eating";

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

async function sendGuide(email) {
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
    from: `"Amin Shabazz Muhammad" <noreply@masterylevelfasting.com>`,
    to: email,
    subject: "Your Free Guide — Precision Eating",
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#faf8f5;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:0 auto;padding:2rem 1.5rem;">
    <div style="text-align:center;margin-bottom:2rem;">
      <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a7a5a;margin-bottom:0.5rem;">Mastery Level Fasting</div>
      <div style="color:#8a7a5a;font-size:22px;margin-bottom:0.25rem;">الْمُخْلَصِينَ</div>
    </div>
    <p style="color:#4a4030;font-size:15px;line-height:1.8;margin-bottom:1.25rem;">
      Thank you for requesting the guide. What you are about to read is drawn from over thirty years of personal practice — not theory, not research alone, but lived testimony.
    </p>
    <p style="color:#4a4030;font-size:15px;line-height:1.8;margin-bottom:2rem;">
      Click below to download your copy of <strong>Precision Eating — Why What You Eat Matters More Than How Much</strong>.
    </p>
    <div style="text-align:center;margin-bottom:2rem;">
      <a href="${PDF_URL}" style="display:inline-block;background:#8a7a5a;color:#faf8f5;text-decoration:none;padding:14px 32px;border-radius:30px;font-size:15px;font-weight:bold;">Download the Guide →</a>
    </div>
    <p style="color:#6a6050;font-size:13px;line-height:1.8;margin-bottom:1rem;">
      If the button does not work, copy and paste this link into your browser:
    </p>
    <p style="color:#8a7a5a;font-size:12px;word-break:break-all;margin-bottom:2rem;">${PDF_URL}</p>
    <hr style="border:none;border-top:1px solid #e0d8cc;margin-bottom:1.5rem;" />
    <p style="color:#6a6050;font-size:13px;line-height:1.8;">
      When you are ready to go deeper, the full platform is available at
      <a href="https://masterylevelfasting.com" style="color:#8a7a5a;">masterylevelfasting.com</a>
      — both books with read-aloud, the complete course, a monthly community fast, and personal consultations.
    </p>
    <p style="color:#6a6050;font-size:12px;margin-top:2rem;text-align:center;">
      © ASM Productions LLC · masterylevelfasting.com
    </p>
  </div>
</body>
</html>`,
    text: `Thank you for requesting the guide.\n\nDownload Precision Eating here:\n${PDF_URL}\n\nWhen you are ready to go deeper, visit masterylevelfasting.com.\n\n— Amin Shabazz Muhammad`,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body || {};
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required." });
  }

  const clean = email.toLowerCase().trim();

  try {
    if (REDIS_URL && REDIS_TOKEN) {
      await redisCmd("SADD", LIST_KEY, clean);
    }
    await sendGuide(clean);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("lead-magnet error:", err.message);
    return res.status(500).json({ error: "Could not send the guide. Please try again." });
  }
}
