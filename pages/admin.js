// pages/admin.js
// Access via a fixed, non-expiring token in the URL (?token=...), the same
// link included in every notification email. No password is typed anywhere.
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const C = { gold: "#8a7a5a", goldLight: "#c8b080", dark: "#0a0a0a", slate: "#c8c0b0", muted: "#6a6050", bg: "#faf8f5", green: "#4a7c5e" };

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("testimonials");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const urlToken = router.query.token;
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("ml_admin_token") : null;
    const t = urlToken || stored;
    if (t) {
      sessionStorage.setItem("ml_admin_token", t);
      setToken(t);
    } else {
      setError("No admin token provided. Use the link from your notification email.");
    }
  }, [router.isReady, router.query.token]);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/admin?action=list&token=${token}`).then(r => r.json()).then(d => {
      if (d.error) setError(d.error);
      else setData(d);
    });
  }, [token]);

  const act = async (type, id, action) => {
    await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, type, id, action }) });
    const refreshed = await fetch(`/api/admin?action=list&token=${token}`).then(r => r.json());
    setData(refreshed);
  };

  if (error) return <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}><div style={{ color: "#c0392b", fontSize: 14 }}>{error}</div></div>;
  if (!data) return <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>Loading...</div>;

  const lists = { testimonials: data.testimonials, fast: data.fast, ramadan: data.ramadan };
  const counts = { testimonials: data.testimonials.length, fast: data.fast.length, ramadan: data.ramadan.length };
  const labels = { testimonials: "Testimonials", fast: "Monthly Fast", ramadan: "Ramadan" };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "sans-serif" }}>
      <div style={{ background: C.dark, padding: "1.5rem", textAlign: "center" }}>
        <div style={{ color: C.goldLight, fontSize: 18, fontFamily: "Georgia, serif" }}>Admin — Comment Review</div>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {Object.keys(labels).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${tab === k ? C.gold : "#ddd"}`, background: tab === k ? C.gold : "white", color: tab === k ? "white" : "#555", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {labels[k]} {counts[k] > 0 && `(${counts[k]})`}
            </button>
          ))}
        </div>

        {lists[tab].length === 0 ? (
          <div style={{ textAlign: "center", color: "#999", padding: "2rem 0" }}>Nothing pending in {labels[tab]}.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {lists[tab].map(item => (
              <div key={item.id} style={{ background: "white", border: "1px solid #e0d8cc", borderRadius: 12, padding: "1.1rem" }}>
                <div style={{ color: "#333", fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>{item.text}</div>
                <div style={{ color: C.gold, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>— {item.name}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => act(tab === "testimonials" ? "testimonial" : tab, item.id, "approve")} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", background: C.green, color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✓ Approve</button>
                  <button onClick={() => act(tab === "testimonials" ? "testimonial" : tab, item.id, "reject")} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #c0392b", background: "white", color: "#c0392b", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✗ Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
