import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section style={{
      backgroundColor: "var(--bg-primary)",
      padding: "80px 24px",
      minHeight: "90vh",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
      }}>
        <div style={{ textAlign: "center", maxWidth: "720px" }}>

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
            <span>✨</span>
            <span>{t.heroBadge}</span>
          </div>

          {/* ✅ Headline */}
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: "800",
            color: "var(--text-heading)",
            lineHeight: "1.15",
            marginBottom: "24px",
          }}>
            {t.heroTitle1}{" "}
            <span style={{ color: "#14b8a6" }}>{t.heroTitle2}</span>
          </h1>

          {/* ✅ Subtitle */}
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--text-secondary)",
            lineHeight: "1.7",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}>
            {t.heroSubtitle}
          </p>

          {/* ✅ CTA Buttons */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}>
            <a href="/booking" style={{
              backgroundColor: "#14b8a6",
              color: "white",
              padding: "16px 32px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "700",
              textDecoration: "none",
              boxShadow: "0 4px 15px rgba(20,184,166,0.4)",
              display: "inline-block",
            }}>
              📅 {t.bookCleaning}
            </a>
            <a href="/services" style={{
              backgroundColor: "var(--bg-card)",
              color: "#0d9488",
              padding: "16px 32px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "700",
              textDecoration: "none",
              border: "2px solid #0d9488",
              display: "inline-block",
            }}>
              🔍 {t.viewServices}
            </a>
          </div>

          {/* ✅ Stats */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "32px",
            justifyContent: "center",
            marginTop: "48px",
          }}>
            {[
              { number: "2,000+", label: t.happyCustomers },
              { number: "4.9★",   label: t.avgRating },
              { number: "5+",     label: t.yearsExp },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "#0d9488",
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  marginTop: "4px",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Service cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          width: "100%",
          maxWidth: "480px",
        }}>
          {[
            { emoji: "🏠", label: t.homeClean },
            { emoji: "🏢", label: t.officeClean },
            { emoji: "🛁", label: t.deepClean },
            { emoji: "🌿", label: t.ecoFriendly },
          ].map((card) => (
            <div key={card.label} style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "16px",
              padding: "24px 16px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid var(--border-color)",
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
                {card.emoji}
              </div>
              <div style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-primary)",
              }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}