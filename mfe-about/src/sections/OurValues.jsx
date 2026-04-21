import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function OurValues() {
  const { t } = useLanguage();

  const values = [
    { emoji: "🤝", title: t.trustTitle,   description: t.trustDesc },
    { emoji: "⭐", title: t.qualityTitle, description: t.qualityDesc },
    { emoji: "🌿", title: t.sustainTitle, description: t.sustainDesc },
    { emoji: "💬", title: t.commTitle,    description: t.commDesc },
  ];

  return (
    <section style={{
      backgroundColor: "var(--bg-secondary)",
      padding: "80px 24px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: "800",
            color: "var(--text-heading)",
            marginBottom: "16px",
          }}>
            {t.whatWeStandFor}
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--text-secondary)",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            {t.valuesSubtitle}
          </p>
        </div>

        {/* ✅ Values grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "64px",
        }}>
          {values.map((value) => (
            <div
              key={value.title}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                padding: "36px 28px",
                textAlign: "center",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>
                {value.emoji}
              </div>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "var(--text-primary)",
                marginBottom: "12px",
              }}>
                {value.title}
              </h3>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: "1.7",
              }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ CTA */}
        <div style={{
          background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
          borderRadius: "24px",
          padding: "48px 32px",
          textAlign: "center",
        }}>
          <h3 style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: "800",
            color: "white",
            marginBottom: "12px",
          }}>
            {t.joinTeam}
          </h3>
          <p style={{
            fontSize: "16px",
            color: "#99f6e0",
            marginBottom: "28px",
            lineHeight: "1.6",
          }}>
            {t.joinDesc}
          </p>
          <a href="/contact" style={{
            backgroundColor: "white",
            color: "#0d9488",
            fontSize: "15px",
            fontWeight: "700",
            padding: "14px 32px",
            borderRadius: "12px",
            textDecoration: "none",
            display: "inline-block",
          }}>
            {"📩"} {t.getInTouch}
          </a>
        </div>

      </div>
    </section>
  );
}