// lib/notifyAdmin.js
// Sends a notification email to the admin whenever a new comment/testimonial
// is submitted and needs review. Reuses the same HostGator SMTP setup as
// send-magic-link.js so no new email infrastructure is needed.

const nodemailer = require("nodemailer");

const ADMIN_NOTIFY_EMAIL = "admin@masterylevelfasting.com";

async function notifyAdmin({ subject, itemType, preview }) {
  const adminToken = process.env.ADMIN_TOKEN;
  const adminLink = `https://masterylevelfasting.com/admin?token=${adminToken}`;

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
    to: ADMIN_NOTIFY_EMAIL,
    subject: subject,
    html: `
      <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:2rem;background:#0a0a0a;color:#c8c0b0;border-radius:8px;">
        <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a7a5a;margin-bottom:8px;">New ${itemType} pending review</div>
        <p style="color:#c8c0b0;line-height:1.8;">${preview}</p>
        <div style="text-align:center;margin:2rem 0;">
          <a href="${adminLink}" style="display:inline-block;padding:14px 32px;background:#8a7a5a;color:white;text-decoration:none;border-radius:24px;font-size:15px;font-weight:700;">
            Review in Admin Dashboard →
          </a>
        </div>
        <p style="font-size:12px;color:#6a6050;text-align:center;">This link does not expire. Bookmark it for quick access any time.</p>
      </div>
    `,
  });
}

export { notifyAdmin, ADMIN_NOTIFY_EMAIL };
