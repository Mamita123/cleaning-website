import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function CallToAction() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: "linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)",
      padding: "80px 24px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        <div style={{ fontSize: "1.5rem", marginBottom: "16px" }}>🧹</div>

        <h2 style={{
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: "800",
          color: "white",
          marginBottom: "16px",
          lineHeight: "1.2",
        }}>
          {t.ctaTitle}
        </h2>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
          color: "#ccfbef",
          marginBottom: "40px",
          lineHeight: "1.7",
        }}>
          {t.ctaSubtitle}
        </p>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}>
          <a href="/booking" style={{
            backgroundColor: "white",
            color: "#0d9488",
            fontSize: "16px",
            fontWeight: "700",
            padding: "16px 36px",
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            display: "inline-block",
          }}>
            📅 {t.bookOff}
          </a>
          <a href="/contact" style={{
            backgroundColor: "transparent",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            padding: "16px 36px",
            borderRadius: "12px",
            textDecoration: "none",
            border: "2px solid rgba(255,255,255,0.6)",
            display: "inline-block",
          }}>
            💬 {t.contactUs}
          </a>
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
          marginTop: "48px",
        }}>
          {[
            { icon: "✅", label: t.noContracts },
            { icon: "🔒", label: t.insured },
            { icon: "💚", label: t.ecoFriendlyBadge },
            { icon: "⭐", label: t.rated },
          ].map((badge) => (
            <span key={badge.label} style={{
              color: "#ccfbef",
              fontSize: "14px",
              fontWeight: "500",
            }}>
              {badge.icon} {badge.label}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}