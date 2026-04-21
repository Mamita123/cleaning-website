import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function ContactHero() {
  const { t } = useLanguage();

  return (
    <section style={{
      backgroundColor: "var(--bg-primary)",
      padding: "72px 24px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* ✅ Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#ccfbef",
          color: "#0f766e",
          padding: "6px 16px",
          borderRadius: "999px",
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "24px",
        }}>
          <span>💬</span>
          <span>{t.contactBadge}</span>
        </div>

        {/* ✅ Headline */}
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: "800",
          color: "var(--text-heading)",
          lineHeight: "1.15",
          marginBottom: "20px",
        }}>
          {t.contactTitle1}{" "}
          <span style={{ color: "#14b8a6" }}>{t.contactTitle2}</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
        }}>
          {t.contactSubtitle}
        </p>

      </div>
    </section>
  );
}