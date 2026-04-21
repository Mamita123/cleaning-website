import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function ReviewsHero() {
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
          <span>⭐</span>
          <span>{t.reviewsBadge}</span>
        </div>

        {/* ✅ Headline */}
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: "800",
          color: "var(--text-heading)",
          lineHeight: "1.15",
          marginBottom: "20px",
        }}>
          {t.reviewsTitle1}{" "}
          <span style={{ color: "#14b8a6" }}>{t.reviewsTitle2}</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "40px",
        }}>
          {t.reviewsSubtitle}
        </p>

        {/* ✅ Overall rating card */}
        <div style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "var(--bg-card)",
          padding: "24px 40px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid var(--border-color)",
        }}>
          <div style={{
            fontSize: "4rem",
            fontWeight: "800",
            color: "#0d9488",
            lineHeight: "1",
            marginBottom: "8px",
          }}>
            4.9
          </div>
          <div style={{
            display: "flex",
            gap: "4px",
            marginBottom: "8px",
          }}>
            {[1,2,3,4,5].map((star) => (
              <span key={star} style={{
                fontSize: "24px",
                color: "#f59e0b",
              }}>
                {"★"}
              </span>
            ))}
          </div>
          <div style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            fontWeight: "500",
          }}>
            {t.basedOn}
          </div>
        </div>

      </div>
    </section>
  );
}