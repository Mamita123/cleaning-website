import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function PricingHero() {
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
          <span>💰</span>
          <span>{t.pricingBadge}</span>
        </div>

        {/* ✅ Headline */}
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: "800",
          color: "var(--text-heading)",
          lineHeight: "1.15",
          marginBottom: "20px",
        }}>
          {t.pricingTitle1}{" "}
          <span style={{ color: "#14b8a6" }}>{t.pricingTitle2}</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "32px",
        }}>
          {t.pricingDesc}
        </p>

        {/* ✅ Trust badges */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "32px",
        }}>
          {[
            { icon: "✅", label: t.noContractsBadge },
            { icon: "💚", label: t.cancelAnytime },
            { icon: "🔄", label: t.satisfactionGuar },
          ].map((badge) => (
            <span key={badge.label} style={{
              backgroundColor: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "14px",
              fontWeight: "500",
              padding: "8px 16px",
              borderRadius: "999px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              border: "1px solid var(--border-color)",
            }}>
              {badge.icon} {badge.label}
            </span>
          ))}
        </div>

        {/* ✅ VAT + Kotitalousvähennys */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "560px",
          margin: "0 auto",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "var(--bg-card)",
            padding: "14px 20px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            textAlign: "left",
          }}>
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>🧾</span>
            <div>
              <div style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "var(--text-primary)",
                marginBottom: "2px",
              }}>
                {t.vatNotice}
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
              }}>
                {t.vatDesc}
              </div>
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#f0fdf9",
            padding: "14px 20px",
            borderRadius: "12px",
            border: "1.5px solid #99f6e0",
            textAlign: "left",
          }}>
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>💡</span>
            <div>
              <div style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#0f766e",
                marginBottom: "2px",
              }}>
                {t.kotivah}
              </div>
              <div style={{
                fontSize: "13px",
                color: "#0d9488",
                lineHeight: "1.5",
              }}>
                {t.kotivahDesc}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}