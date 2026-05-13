import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function BookingHero() {
  const { t } = useLanguage();

  return (
    <section style={{
      backgroundColor: "var(--bg-primary)",
      padding: "56px 24px",
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
          marginBottom: "20px",
        }}>
         
          <span>{t.bookingBadge}</span>
        </div>

        {/* ✅ Headline */}
        <h1 style={{
          fontSize: "clamp(1.75rem, 4vw, 3rem)",
          fontWeight: "800",
          color: "var(--text-heading)",
          lineHeight: "1.15",
          marginBottom: "16px",
        }}>
          {t.bookingTitle1}{" "}
          <span style={{ color: "#14b8a6" }}>{t.bookingTitle2}</span>
        </h1>

        {/* ✅ Subtitle */}
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.1rem)",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
        }}>
          {t.bookingSubtitle}
        </p>

      </div>
    </section>
  );
}