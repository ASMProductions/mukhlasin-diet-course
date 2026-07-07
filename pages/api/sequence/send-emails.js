// pages/api/sequence/send-emails.js
// MLF Mastery Level Fasting - Email sequence sender
// Triggered by GitHub Action 3x weekly (Mon/Wed/Fri) at 2am UTC

import nodemailer from "nodemailer";

const SITE = "https://masterylevelfasting.com";
const FUNNEL_KEY = "precision-eating";

// Email sequence (7 emails)
const emailSequence = [
  {
    step: 1,
    subject: "Your introduction is here — the Mastery Level Fasting discipline begins now",
    day: 0,
    body: `You have the PDF. It is called Precision Eating, but it is an introduction to something deeper.

It is an introduction to Mastery Level Fasting — a spiritual discipline rooted in self-purification. A practice that has shaped my life for nearly forty years. Since 1990. A path that teaches you not just what you eat, but how to reclaim dominion over your own body and spirit.

This is not a diet. This is a discipline.

The PDF gives you a framework. But the framework only matters if you understand what it is serving: the purification of self. The transformation of your relationship with hunger, desire, and control. The recognition that your body is not your enemy — it is your teacher.

Read the PDF. But know that what you are beginning is bigger than what that document contains.

There is no shortcut. There is no rush. But there is a way.

Amin Shabazz Muhammad
Mastery Level Fasting`,
  },
  {
    step: 2,
    subject: "36 years of The Mukhlasin Diet — what the discipline actually produces",
    dayRange: [2, 4],
    body: `Since 1990, I have lived the discipline of Mastery Level Fasting — what the Holy Quran calls the path of al-Mukhlasin, the Purified Ones.

This is not theory. This is testimony.

When you practice this discipline for nearly four decades, your body does not lie. Your mind does not lie. Your face does not lie.

"Faces on that day will be bright, laughing, joyous. And faces on that day will have dust on them — darkness covering them. The discipline — or its rejection — is written on the countenance."

This is from Quran 80:38–41. Not poetry. Precision.

The Mukhlasin Diet is not called that because it is complicated. It is called that because it produces a specific result: the purification of the body and the clarity of the spirit. A man or woman who has undertaken this discipline carries it in their energy, their peace, their presence.

At 57, I am not telling you what I believe happens. I am showing you what thirty-six years of practice looks like — what it produces, how it sustains, what remains true.

The path to Mastery Level Fasting begins with understanding: this is a spiritual practice rooted in an ancient tradition. Your entrance point is one meal a day. From there, if you choose to go deeper, the discipline opens further still.

Understand the discipline.`,
  },
  {
    step: 3,
    subject: "What \"self-purification\" actually means",
    dayRange: [5, 6],
    body: `Most people hear "discipline" and think restriction. They hear "fasting" and think starvation. They hear "purification" and think deprivation.

That is not what The Mukhlasin Diet teaches.

Here is what matters: discipline sustained. Not for a month. Not for a year. For decades.

I have been at one meal every two or three days longer than I have been at one meal a day. That is not theory. That is testimony. That is what it means to master the discipline.

Mastery is not reaching the highest level. Mastery is staying there. Maintaining it. Living inside it consistently, year after year, decade after decade.

Purification means this: as above, so below. The Earth purifies itself. Water rises through fire and returns to the Earth pure. Both the Earth and the human body are 75% water. When you practice the discipline, your body undergoes the same purification process that the Earth undergoes — ascending through the fire of the practice, returning transformed.

But purification is not a destination. It is a practice. It is what happens when you sustain the discipline continuously. When you do not retreat to the easier levels. When you remain at the height you have reached.

The Mukhlasin are called "the Purified Ones" not because they reached a level. But because they have sustained it. They have done the work. Consistently. Over time. Until it becomes the fabric of who they are.

That is what Mastery Level Fasting offers: the path to becoming someone for whom the discipline is not a practice — it is a way of life.`,
  },
  {
    step: 4,
    subject: "There is only one correct starting point — and mastery is sustaining it",
    dayRange: [7, 9],
    body: `Many people ask: "Can I start with one meal every two days?"

The answer is: No.

There is only one correct path of progression:

Level One: One meal a day — the mandatory entry point. This is where everyone begins. You sustain it until your body and spirit are ready for what comes next.

Level Two: One meal every two days — only after months or years at Level One. Not before. This is where discipline deepens. Where you prove you can sustain something harder, consistently.

Level Three: One meal every three days — advanced. I have sustained this level longer than I sustained Level One. That is not about moving faster through levels. That is about staying at the height you reach. About making the discipline your baseline, not your achievement.

Mastery is not reaching a level. Mastery is staying there.

There is no shortcut. There is no rush.

This is not arbitrary. Every level has a purpose. Every threshold is a test. Your body learns. Your spirit transforms. Your mind clarifies.

But the real test is not the threshold itself. It is what happens after. Can you sustain it? For months? For years? For decades?

Most people reach a level and retreat. They say it was too hard. The discipline teaches you to remain.

The Mukhlasin Diet is ancient. It has been practiced for thousands of years by those who understood: mastery is not achievement. Mastery is continuity.

Enter at one meal a day. Do the work at that level. Feel what happens. When you are truly ready — and when your body is truly ready — the next level opens.

Then the real work begins: sustaining it. Building a life inside it. Making it who you are, not what you do.`,
  },
  {
    step: 5,
    subject: "What 36 years of The Mukhlasin Diet looks like — sustained at the highest level",
    dayRange: [10, 11],
    body: `I am 57 years old.

I have been practicing The Mukhlasin Diet since 1990. Nearly forty years.

But here is what matters: I have sustained one meal every two or three days for longer than I ever sustained one meal a day.

"For over 30 years — now entering his fourth decade of practice — he has lived what others only study. What you see in his face at 57 years old is not a claim. It is a testimony."

That is not marketing. That is fact.

Most people do not understand what this means. They think mastery is reaching a level. But I did not reach one meal every two or three days and then retreat to something easier. I stayed there. Built my life there. Made it the baseline of who I am.

That is the testimony.

Not achievement. Continuity.

When you practice Mastery Level Fasting, you are not seeking the next level. You are seeking to remain at the level you have reached. To sustain it. To let it shape you completely.

That is what the discipline produces: not a change. A transformation.

Quran 7:42 says: "We impose not on any soul a duty beyond its scope."

The discipline is not punishment. It is mercy. It is your own path to your own purification — and that path is walked by remaining on it consistently.

And the evidence of that purification is written where words cannot reach — in the testimony of a life sustained in alignment with it.

That is what 36 years looks like. Not years of trying. Years of being.`,
  },
  {
    step: 6,
    subject: "Beyond the introduction — The Mukhlasin Diet complete",
    dayRange: [12, 13],
    body: `The PDF is your introduction. It shows you the framework.

But Mastery Level Fasting is a complete path. It requires more than knowing — it requires living and sustaining.

The course takes you through all three sections:

Section I — Spiritual: Why al-Mukhlasin — the Purified Ones — appear seven times in the Quran. What that number means. Who these people are. What they understand that others do not. The spiritual foundation of the discipline.

Section II — Personal Experience: Nearly forty years of sustained testimony. What happens when you enter at one meal a day and remain there. What it means to move to one meal every two days and stay there. When you reach one meal every three days and build a life there. Not retreating. Not chasing the next achievement. But sustaining, deepening, integrating. The journey from 1990 to now.

Section III — Counteraction: The resistance you will face. Your body's objections. Your mind's fears. The moments when you want to retreat to easier levels. How to distinguish between genuine danger signals and the voice of comfort crying out for what it has lost. How to remain.

Plus: the community. The consultations. The direct guidance from someone who has sustained this path and completed it.

This is not about information. This is about transmission — the passing down of a practice from one who has lived it not for a season, but for decades, to one who is ready to receive it.

One enrollment. Complete access. Forever.`,
  },
  {
    step: 7,
    subject: "You know the framework. Now decide.",
    dayRange: [14, 16],
    body: `You have read the introduction. You understand the framework. You can feel the difference between intellectual knowledge and lived practice.

The discipline is clear. The path is there. The only question is: are you ready to walk it — not for a season, but sustained?

You have two choices:

One: Apply the framework alone. Study the PDF. Try one meal a day. Discover through trial. Learn from your own experience. This path works. Many have walked it successfully.

Two: Walk the path with someone who has already sustained it for nearly forty years. Someone who began in 1990 and has remained at the highest levels of the discipline. Someone who did not move through levels and retreat, but who stayed there. Someone who can show you — not just tell you, but show you — what a life sustained in the discipline actually looks like.

The course is that second path.

Not because the first fails. But because the second is cleaner. More direct. Rooted in transmission from teacher to student — the way this discipline has always been passed down.

"There is no shortcut. There is no rush." But there is a way to understand faster by learning from testimony of sustained practice rather than starting from zero.

Thirty-six years. From 1990 to now. I am not telling you what I think will happen. I am showing you what happens when you remain.

The Mukhlasin Diet is waiting. The path to Mastery Level Fasting is open. The teacher is here.

When you are ready, enrollment is one decision away.

Your spirit knows. The only question is: will you listen?`,
  },
];

export default async function handler(req, res) {
  // Verify the request is from GitHub Action (check authorization token)
  const authToken = req.headers.authorization?.split(" ")[1];
  if (authToken !== process.env.SEQUENCE_AUTH_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Get all subscribers from Redis set
    const redisRes = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SMEMBERS", `sequence:${FUNNEL_KEY}:pending`]),
    });

    if (!redisRes.ok) {
      return res.status(500).json({ error: "Redis fetch failed" });
    }

    const redisData = await redisRes.json();
    const subscribers = redisData.result || [];

    let sent = 0;
    let errors = [];

    // 2. For each subscriber, check eligibility and send
    for (const email of subscribers) {
      try {
        // Get subscriber data
        const dataRes = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            "GET",
            `sequence:${FUNNEL_KEY}:data:${email}`,
          ]),
        });

        const dataResult = await dataRes.json();
        let subscriberData = dataResult.result
          ? JSON.parse(dataResult.result)
          : {
              email,
              signup_timestamp: Math.floor(Date.now() / 1000),
              current_step: 0,
              sent_emails: [],
            };

        // Calculate days elapsed
        const now = Math.floor(Date.now() / 1000);
        const daysElapsed = Math.floor(
          (now - subscriberData.signup_timestamp) / 86400
        );

        // Find which email to send
        let emailToSend = null;
        for (const emailDef of emailSequence) {
          if (subscriberData.sent_emails.includes(emailDef.step)) {
            continue; // Already sent
          }

          // Check day eligibility
          if (emailDef.dayRange) {
            if (
              daysElapsed >= emailDef.dayRange[0] &&
              daysElapsed <= emailDef.dayRange[1]
            ) {
              emailToSend = emailDef;
              break;
            }
          } else if (emailDef.day === 0 && daysElapsed === 0) {
            emailToSend = emailDef;
            break;
          }
        }

        // Send email if eligible
        if (emailToSend) {
          await sendEmail(email, emailToSend);
          subscriberData.current_step = emailToSend.step;
          subscriberData.sent_emails.push(emailToSend.step);

          // Update Redis
          await fetch(process.env.UPSTASH_REDIS_REST_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              "SET",
              `sequence:${FUNNEL_KEY}:data:${email}`,
              JSON.stringify(subscriberData),
            ]),
          });

          sent++;
        }
      } catch (err) {
        errors.push({ email, error: err.message });
      }
    }

    return res.status(200).json({
      success: true,
      sent,
      total: subscribers.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error("Sequence send error:", err);
    return res.status(500).json({ error: err.message });
  }
}

async function sendEmail(to, emailDef) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Mastery Level Fasting" <${process.env.SMTP_USER}>`,
    to,
    subject: emailDef.subject,
    text: emailDef.body,
    html: `
      <div style="background:#f5f5f5;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#333;">
        <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:32px;border:1px solid #ddd;">
          <h2 style="font-family:Georgia,serif;color:#2c2c2c;font-size:20px;margin:0 0 16px;">${emailDef.subject}</h2>
          <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 14px;white-space:pre-line;">${emailDef.body}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="font-size:12px;color:#666;text-align:center;margin:0;">
            Mastery Level Fasting &middot; <a href="${SITE}" style="color:#333;">masterylevelfasting.com</a>
          </p>
        </div>
      </div>`,
  });
}
