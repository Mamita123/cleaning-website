import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function ServicesHero() {
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
          <span>🧹</span>
          <span>{t.servicesBadge}</span>
        </div>

        {/* ✅ Headline */}
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: "800",
          color: "var(--text-heading)",
          lineHeight: "1.15",
          marginBottom: "20px",
        }}>
          {t.servicesTitle1}{" "}
          <span style={{ color: "#14b8a6" }}>{t.servicesTitle2}</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "36px",
        }}>
          {t.servicesDesc}
        </p>

        {/* ✅ Quick stats */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}>
          {[
            { icon: "🏠", text: t.serviceTypes },
            { icon: "⭐", text: "4.9 " + t.avgRating },
            { icon: "👥", text: "2,000+ " + t.happyCustomers },
            { icon: "🌿", text: t.ecoFriendly },
          ].map((item) => (
            <div key={item.text} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--bg-card)",
              padding: "8px 16px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--text-primary)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              border: "1px solid var(--border-color)",
            }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}