// pages/testimonials.js
import { useState, useEffect } from "react";

const C = { gold: "#8a7a5a", goldLight: "#c8b080", dark: "#0a0a0a", cream: "#f5f0e8", slate: "#c8c0b0", muted: "#6a6050", border: "#2a2520", bg: "#faf8f5", green: "#4a7c5e" };

export default function Testimonials() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/testimonials").then(r => r.json()).then(d => { setList(d.testimonials || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const submit = async () => {
    setError("");
    if (!name.trim() || !text.trim()) { setError("Please enter your name and a message."); return; }
    const res = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, text }) });
    const data = await res.json();
    if (data.submitted) { setSubmitted(true); setName(""); setText(""); }
    else setError(data.error || "Something went wrong. Please try again.");
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
      <div style={{ background: C.dark, padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: 10 }}>The Mukhlasin Diet</div>
        <h1 style={{ color: C.goldLight, fontWeight: "normal", fontSize: "1.8rem" }}>Testimonials</h1>
        <p style={{ color: C.slate, fontSize: 14, maxWidth: 480, margin: "0.75rem auto 0", lineHeight: 1.7 }}>Words from students and practitioners of the discipline.</p>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ background: "white", border: `1px solid #e0d8cc`, borderRadius: 14, padding: "1.75rem", marginBottom: "2.5rem" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>✓</div>
              <div style={{ color: "#111", fontSize: 16, marginBottom: 6 }}>Thank you for sharing.</div>
              <div style={{ color: "#666", fontSize: 13 }}>Your testimonial will appear here once reviewed.</div>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: 16, background: "none", border: "none", color: C.gold, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Share another</button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 15, color: "#111", marginBottom: 14, fontWeight: 700 }}>Share Your Experience</div>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0d8cc", borderRadius: 8, fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "sans-serif" }} />
              <textarea value={text} onChange={e => setText(e.target.value)} placeholder="What has this discipline meant to you?" rows={4} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0d8cc", borderRadius: 8, fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "sans-serif", resize: "vertical" }} />
              {error && <div style={{ color: "#c0392b", fontSize: 12, marginBottom: 10 }}>{error}</div>}
              <button onClick={submit} style={{ width: "100%", background: C.gold, color: "white", border: "none", padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Submit Testimonial</button>
              <div style={{ fontSize: 11, color: "#999", marginTop: 8, textAlign: "center" }}>Submissions are reviewed before appearing publicly.</div>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "#999", fontSize: 13 }}>Loading testimonials...</div>
        ) : list.length === 0 ? (
          <div style={{ textAlign: "center", color: "#999", fontSize: 13 }}>Be the first to share your experience.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {list.slice().reverse().map(t => (
              <div key={t.id} style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 12, padding: "1.25rem" }}>
                <div style={{ color: "#333", fontSize: 14, lineHeight: 1.7, marginBottom: 10, fontStyle: "italic" }}>"{t.text}"</div>
                <div style={{ color: C.gold, fontSize: 12, fontWeight: 700 }}>— {t.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
