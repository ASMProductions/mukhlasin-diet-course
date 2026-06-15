// pages/magic-link.js
// Student lands here after clicking the email magic link

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MagicLinkPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your access…");

  useEffect(() => {
    const { token } = router.query;
    if (!token) return;

    async function verify() {
      try {
        const res = await fetch("/api/verify-magic-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (data.valid) {
          try { sessionStorage.setItem("ml_access", "true"); } catch(e) {}
          setStatus("Access confirmed. Entering the course…");
          setTimeout(() => router.replace("/"), 1500);
        } else {
          setStatus(data.error || "Link invalid. Please request a new one.");
        }
      } catch {
        setStatus("Connection error. Please try again.");
      }
    }
    verify();
  }, [router.query]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Georgia, serif",
      color: "#8a7a5a",
      fontSize: "18px",
      textAlign: "center",
      padding: "20px",
    }}>
      <div>
        <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a7a5a", marginBottom: 16 }}>
          The Mukhlasin Diet — 4th Edition
        </div>
        <div style={{ fontSize: 26, fontFamily: "serif", direction: "rtl", marginBottom: 20 }}>الْمُخْلَصِينَ</div>
        <div style={{ color: "#c8c0b0", fontSize: 16 }}>{status}</div>
      </div>
    </div>
  );
}
