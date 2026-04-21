import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    { emoji: "🌿", title: t.ecoTitle,   description: t.ecoDesc },
    { emoji: "⏰", title: t.flexTitle,  description: t.flexDesc },
    { emoji: "✅", title: t.vettedTitle, description: t.vettedDesc },
    { emoji: "💰", title: t.transTitle, description: t.transDesc },
    { emoji: "🔁", title: t.guarTitle,  description: t.guarDesc },
    { emoji: "📱", title: t.easyTitle,  description: t.easyDesc },
  ];

  return (
    <section style={{
      backgroundColor: "var(--bg-secondary)",
      padding: "80px 24px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: "800",
            color: "var(--text-heading)",
            marginBottom: "16px",
          }}>
            {t.whyChooseUs}
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            {t.whySubtitle}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                padding: "32px 28px",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
                {feature.emoji}
              </div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "var(--text-heading)",
                marginBottom: "10px",
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: "1.7",
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}