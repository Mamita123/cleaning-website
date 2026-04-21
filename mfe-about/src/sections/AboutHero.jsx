import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function AboutHero() {
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
          <span>👋</span>
          <span>{t.aboutBadge}</span>
        </div>

        {/* ✅ Headline */}
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: "800",
          color: "var(--text-heading)",
          lineHeight: "1.15",
          marginBottom: "20px",
        }}>
          {t.aboutTitle1}{" "}
          <span style={{ color: "#14b8a6" }}>{t.aboutTitle2}</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "40px",
        }}>
          {t.aboutSubtitle}
        </p>

        {/* ✅ Stats */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
        }}>
          {[
            { number: "2023",  label: t.yearFounded },
            { number: "3",     label: t.teamMembers },
            { number: "€53k",  label: t.revenue2024 },
            { number: "4.9★",  label: t.avgRating },
          ].map((stat) => (
            <div key={stat.label} style={{
              backgroundColor: "var(--bg-card)",
              padding: "20px 28px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              minWidth: "120px",
              border: "1px solid var(--border-color)",
            }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: "800",
                color: "#0d9488",
                lineHeight: "1",
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginTop: "6px",
                fontWeight: "500",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}