// pages/monthly-fast.js
import { useState, useEffect } from "react";

const C = { gold: "#8a7a5a", goldLight: "#c8b080", dark: "#0a0a0a", cream: "#f5f0e8", slate: "#c8c0b0", muted: "#6a6050", bg: "#faf8f5" };

function nextFastLabel() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const dayOfWeek = first.getDay();
  const offset = (5 - dayOfWeek + 7) % 7;
  const nextFriday = new Date(now.getFullYear(), now.getMonth() + 1, 1 + offset);
  return nextFriday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function MonthlyFast() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/fastcomments").then(r => r.json()).then(setData);
  }, []);

  const submit = async () => {
    setError("");
    if (!name.trim() || !text.trim()) { setError("Please enter your name and a message."); return; }
    const res = await fetch("/api/fastcomments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, text }) });
    const d = await res.json();
    if (d.submitted) { setSubmitted(true); setName(""); setText(""); }
    else setError(d.error || "Something went wrong.");
  };

  if (!data) return <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>Loading...</div>;

  const start = new Date(data.start);
  const end = new Date(data.end);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
      <div style={{ background: C.dark, padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>🌙</div>
        <h1 style={{ color: C.goldLight, fontWeight: "normal", fontSize: "1.7rem", marginBottom: 8 }}>Monthly 72-Hour Community Fast</h1>
        {data.isActive ? (
          <p style={{ color: C.slate, fontSize: 14 }}>Active now — through {end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        ) : (
          <p style={{ color: C.slate, fontSize: 14 }}>Next fast begins {start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} — first Friday of the month</p>
        )}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ background: data.isActive ? "#0d0b08" : "white", border: `1px solid ${data.isActive ? C.gold : "#e0d8cc"}`, borderRadius: 14, padding: "1.5rem", marginBottom: "2rem", textAlign: "center" }}>
          <div style={{ color: data.isActive ? C.goldLight : "#111", fontSize: 15, lineHeight: 1.8 }}>
            {data.isActive
              ? "Fast together, grow together. Share your thoughts and perspective below as you move through these 72 hours."
              : "Join the community fast every first Friday through Sunday of the month. Check back when it begins to share your experience."}
          </div>
        </div>

        <div style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 14, padding: "1.5rem", marginBottom: "2rem" }}>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
              <div style={{ color: "#111", fontSize: 15 }}>Thank you — your post will appear once reviewed.</div>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: 14, background: "none", border: "none", color: C.gold, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Post another</button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 14, color: "#111", fontWeight: 700, marginBottom: 12 }}>Share your thoughts or perspective</div>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0d8cc", borderRadius: 8, fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "sans-serif" }} />
              <textarea value={text} onChange={e => setText(e.target.value)} placeholder="What's on your mind during this fast?" rows={4} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0d8cc", borderRadius: 8, fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "sans-serif", resize: "vertical" }} />
              {error && <div style={{ color: "#c0392b", fontSize: 12, marginBottom: 10 }}>{error}</div>}
              <button onClick={submit} style={{ width: "100%", background: C.gold, color: "white", border: "none", padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Post</button>
              <div style={{ fontSize: 11, color: "#999", marginTop: 8, textAlign: "center" }}>Posts are reviewed before appearing publicly.</div>
            </div>
          )}
        </div>

        {data.comments.length === 0 ? (
          <div style={{ textAlign: "center", color: "#999", fontSize: 13 }}>No posts yet this cycle. Be the first to share.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {data.comments.slice().reverse().map(c => (
              <div key={c.id} style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 12, padding: "1.1rem" }}>
                <div style={{ color: "#333", fontSize: 14, lineHeight: 1.7, marginBottom: 6 }}>{c.text}</div>
                <div style={{ color: C.gold, fontSize: 12, fontWeight: 700 }}>— {c.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
