// pages/api/stripe-webhook.js
// Receives Stripe payment, saves email → paid in Upstash Redis
import Stripe from "stripe";
export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function saveEmailToUpstash(email) {
  await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/paid:${email.toLowerCase()}/true`, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
  });
  console.log("Access recorded for:", email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const rawBody = await getRawBody(req);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).json({ error: err.message });
  }

  // One-time payment (course, lifetime)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email;
    if (email) await saveEmailToUpstash(email);
  }

  // Subscription created
  if (event.type === "customer.subscription.created") {
    const subscription = event.data.object;
    const customerId = subscription.customer;
    try {
      const customer = await stripe.customers.retrieve(customerId);
      if (customer.email) await saveEmailToUpstash(customer.email);
    } catch (err) {
      console.error("Could not retrieve customer:", err.message);
    }
  }

  // Subscription renewed (monthly/annual renewal)
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object;
    const email = invoice.customer_email;
    if (email) await saveEmailToUpstash(email);
  }

  return res.status(200).json({ received: true });
}
