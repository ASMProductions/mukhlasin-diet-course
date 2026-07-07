// pages/refund-policy.js — Mastery Level Fasting
// Cancellation & Refund Policy. Linked from footer and near checkout buttons.
// REPLACE STRIPE_PORTAL_LINK below with your Customer Portal login link
// (Stripe Dashboard → Settings → Billing → Customer Portal → copy login link)

const STRIPE_PORTAL_LINK = "https://billing.stripe.com/p/login/REPLACE_ME";

const C = {
  bg: "#faf8f5", text: "#4a4030", muted: "#6a6050", gold: "#8a7a5a",
  border: "#e0d8cc",
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: 16, color: C.gold, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.875rem", fontWeight: 700 }}>{title}</h2>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 15, color: C.text, lineHeight: 1.85, marginBottom: "1rem", fontFamily: "sans-serif" }}>{children}</p>;
}

export default function RefundPolicy() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: 8, fontFamily: "sans-serif" }}>Mastery Level Fasting</div>
          <div style={{ color: C.gold, fontSize: 22, marginBottom: 8 }}>الْمُخْلَصِينَ</div>
          <h1 style={{ fontSize: "clamp(22px,3.5vw,30px)", color: C.text, fontWeight: "normal", margin: 0 }}>Cancellation &amp; Refund Policy</h1>
          <div style={{ fontSize: 12, color: C.muted, fontFamily: "sans-serif", marginTop: 8 }}>Effective as of the date of purchase · masterylevelfasting.com</div>
        </div>

        <Section title="One-Time Purchases (Course & Platform Access)">
          <P>Purchases of digital course and platform access may be refunded within <strong>24 hours of purchase</strong>, provided that less than 20% of the course content has been accessed.</P>
          <P>After 24 hours, or once more than 20% of the content has been accessed — whichever comes first — <strong>all sales are final</strong>. Digital content cannot be returned once it has been consumed, and this policy protects the integrity of the teaching for all students.</P>
          <P>To request a refund within the eligible window, email <a href="mailto:info@masterylevelfasting.com" style={{ color: C.gold }}>info@masterylevelfasting.com</a> from the email address used at purchase.</P>
        </Section>

        <Section title="Subscriptions">
          <P>You may cancel your subscription at any time — no phone call, no explanation required. Manage or cancel your subscription here:</P>
          <p style={{ textAlign: "center", margin: "1.5rem 0" }}>
            <a href={STRIPE_PORTAL_LINK} style={{ display: "inline-block", background: C.gold, color: C.bg, textDecoration: "none", fontWeight: "bold", padding: "13px 28px", borderRadius: 30, fontSize: 14, fontFamily: "sans-serif" }}>Manage My Subscription</a>
          </p>
          <P>Cancellation stops all future billing. Your access continues until the end of the billing period you have already paid for. <strong>Cancellation is not a refund</strong> — partial months and partial years are not refunded, because the access for that period was delivered as purchased.</P>
        </Section>

        <Section title="Consultations">
          <P>Personal consultations may be rescheduled up to 24 hours before the appointed time at no charge. Missed appointments without notice are non-refundable.</P>
        </Section>

        <Section title="Important Notes">
          <P>This policy is presented before purchase and agreed to at checkout. Refunds, where eligible, are returned to the original payment method and may take 5–10 business days to appear depending on your bank.</P>
          <P>This is a spiritual discipline and educational platform. Nothing on this site is medical advice, and results described reflect personal testimony.</P>
        </Section>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: C.muted, fontFamily: "sans-serif" }}>Questions? <a href="mailto:info@masterylevelfasting.com" style={{ color: C.gold }}>info@masterylevelfasting.com</a></div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: "sans-serif", marginTop: 6 }}>© ASM Productions LLC · masterylevelfasting.com</div>
        </div>
      </div>
    </div>
  );
}
