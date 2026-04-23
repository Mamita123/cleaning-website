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
          <span>📅</span>
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

        {/* ✅ Steps indicator */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          marginTop: "24px",
        }}>
          {[t.step1Label, t.step2Label, t.step3Label, t.step4Label].map((step) => (
            <div key={step} style={{
              backgroundColor: "var(--bg-card)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-primary)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              border: "1px solid var(--border-color)",
            }}>
              {step}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}