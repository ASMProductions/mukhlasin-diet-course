// pages/community.js
// One page, three tabs — replaces the separate testimonials.js, monthly-fast.js,
// and ramadan.js pages. Same API routes underneath, just one entry point now.
import { useState, useEffect } from "react";

const C = { gold: "#8a7a5a", goldLight: "#c8b080", dark: "#0a0a0a", slate: "#c8c0b0", muted: "#6a6050", bg: "#faf8f5", green: "#4a7c5e" };

function SubmitForm({ onSubmit, placeholder }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!name.trim() || !text.trim()) { setError("Please enter your name and a message."); return; }
    const res = await onSubmit(name, text);
    if (res.submitted) { setSubmitted(true); setName(""); setText(""); }
    else setError(res.error || "Something went wrong.");
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
        <div style={{ color: "#111", fontSize: 15 }}>Thank you — this will appear once reviewed.</div>
        <button onClick={() => setSubmitted(false)} style={{ marginTop: 14, background: "none", border: "none", color: C.gold, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Post another</button>
      </div>
    );
  }
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0d8cc", borderRadius: 8, fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "sans-serif" }} />
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder={placeholder} rows={4} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0d8cc", borderRadius: 8, fontSize: 14, marginBottom: 10, boxSizing: "border-box", fontFamily: "sans-serif", resize: "vertical" }} />
      {error && <div style={{ color: "#c0392b", fontSize: 12, marginBottom: 10 }}>{error}</div>}
      <button onClick={submit} style={{ width: "100%", background: C.gold, color: "white", border: "none", padding: 12, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Post</button>
      <div style={{ fontSize: 11, color: "#999", marginTop: 8, textAlign: "center" }}>Posts are reviewed before appearing publicly.</div>
    </div>
  );
}

function CommentList({ items, emptyText }) {
  if (!items || items.length === 0) return <div style={{ textAlign: "center", color: "#999", fontSize: 13, padding: "1rem 0" }}>{emptyText}</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.slice().reverse().map(c => (
        <div key={c.id} style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 12, padding: "1.1rem" }}>
          <div style={{ color: "#333", fontSize: 14, lineHeight: 1.7, marginBottom: 6 }}>{c.text}</div>
          <div style={{ color: C.gold, fontSize: 12, fontWeight: 700 }}>— {c.name}</div>
        </div>
      ))}
    </div>
  );
}

function TestimonialsTab() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/testimonials").then(r => r.json()).then(d => { setList(d.testimonials || []); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const onSubmit = async (name, text) => (await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, text }) })).json();
  return (
    <div>
      <div style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 14, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 14, color: "#111", fontWeight: 700, marginBottom: 12 }}>Share Your Experience</div>
        <SubmitForm onSubmit={onSubmit} placeholder="What has this discipline meant to you?" />
      </div>
      {loading ? <div style={{ textAlign: "center", color: "#999", fontSize: 13 }}>Loading...</div> : <CommentList items={list} emptyText="Be the first to share your experience." />}
    </div>
  );
}

function MonthlyFastTab() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch("/api/fastcomments").then(r => r.json()).then(setData); }, []);
  const onSubmit = async (name, text) => (await fetch("/api/fastcomments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, text }) })).json();
  if (!data) return <div style={{ textAlign: "center", color: "#999", fontSize: 13 }}>Loading...</div>;
  const start = new Date(data.start), end = new Date(data.end);
  return (
    <div>
      <div style={{ background: data.isActive ? "#0d0b08" : "white", border: `1px solid ${data.isActive ? C.gold : "#e0d8cc"}`, borderRadius: 14, padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center" }}>
        <div style={{ color: data.isActive ? C.goldLight : "#111", fontSize: 14, lineHeight: 1.7 }}>
          {data.isActive ? `Active now — through ${end.toLocaleDateString("en-US", { month: "long", day: "numeric" })}` : `Next fast begins ${start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} — first Friday of the month`}
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 14, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 14, color: "#111", fontWeight: 700, marginBottom: 12 }}>Share your thoughts or perspective</div>
        <SubmitForm onSubmit={onSubmit} placeholder="What's on your mind during this fast?" />
      </div>
      <CommentList items={data.comments} emptyText="No posts yet this cycle." />
    </div>
  );
}

function RamadanTab() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch("/api/ramadan-comments").then(r => r.json()).then(setData); }, []);
  const onSubmit = async (name, text) => (await fetch("/api/ramadan-comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, text }) })).json();
  if (!data) return <div style={{ textAlign: "center", color: "#999", fontSize: 13 }}>Loading...</div>;
  const start = new Date(data.start), end = new Date(data.end);
  return (
    <div>
      <div style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 14, padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 18, color: C.gold, direction: "rtl", fontFamily: "serif", marginBottom: 6 }}>رَمَضَان</div>
        <div style={{ color: "#111", fontSize: 14 }}>Ramadan {data.hijriYear} AH — {data.isActive ? `underway through ${end.toLocaleDateString("en-US", { month: "long", day: "numeric" })}` : `begins approximately ${start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}</div>
        <div style={{ color: "#999", fontSize: 11, marginTop: 6 }}>Dates are calculated and approximate.</div>
      </div>
      <div style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 14, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 14, color: "#111", fontWeight: 700, marginBottom: 12 }}>Share a reflection or intention</div>
        <SubmitForm onSubmit={onSubmit} placeholder="Your reflection, intention, or experience this Ramadan..." />
      </div>
      <CommentList items={data.comments} emptyText="No reflections yet this year." />
    </div>
  );
}

export default function Community() {
  const [tab, setTab] = useState("testimonials");
  const tabs = { testimonials: { label: "Testimonials", Comp: TestimonialsTab }, fast: { label: "Monthly Fast", Comp: MonthlyFastTab }, ramadan: { label: "Ramadan", Comp: RamadanTab } };
  const Active = tabs[tab].Comp;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
      <div style={{ background: C.dark, padding: "1.25rem 1.5rem" }}>
        <a href="/" style={{ color: C.gold, fontSize: 13, textDecoration: "none", border: `1px solid ${C.gold}`, padding: "6px 14px", borderRadius: 20, display: "inline-block" }}>← Library</a>
        <h1 style={{ color: C.goldLight, fontWeight: "normal", fontSize: "1.5rem", marginTop: 14, marginBottom: 4 }}>Community</h1>
        <p style={{ color: C.slate, fontSize: 13 }}>Testimonials, the monthly fast, and Ramadan — all in one place.</p>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "1.5rem" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {Object.entries(tabs).map(([key, t]) => (
            <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${tab === key ? C.gold : "#ddd"}`, background: tab === key ? C.gold : "white", color: tab === key ? "white" : "#555", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{t.label}</button>
          ))}
        </div>
        <Active />
      </div>
    </div>
  );
}
