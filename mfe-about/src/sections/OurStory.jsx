import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function OurStory() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: "2023",
      emoji: "🌱",
      title: t.milestone1Title,
      description: t.milestone1Desc,
    },
    {
      year: "2023",
      emoji: "📈",
      title: t.milestone2Title,
      description: t.milestone2Desc,
    },
    {
      year: "2024",
      emoji: "🚀",
      title: t.milestone3Title,
      description: t.milestone3Desc,
    },
    {
      year: "2025",
      emoji: "🏆",
      title: t.milestone4Title,
      description: t.milestone4Desc,
    },
  ];

  return (
    <section style={{
      backgroundColor: "var(--bg-secondary)",
      padding: "80px 24px",
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: "800",
            color: "var(--text-heading)",
            marginBottom: "16px",
          }}>
            {t.ourJourney}
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--text-secondary)",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            {t.journeySubtitle}
          </p>
        </div>

        {/* ✅ Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {milestones.map((item, index) => (
            <div
              key={item.year + index}
              style={{
                display: "flex",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                gap: "24px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* ✅ Content card */}
              <div style={{
                flex: 1,
                minWidth: "280px",
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                border: "1px solid var(--border-color)",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}>
                  <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  margin: 0,
                }}>
                  {item.description}
                </p>
              </div>

              {/* ✅ Year badge */}
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#14b8a6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 16px rgba(20,184,166,0.35)",
              }}>
                <span style={{
                  color: "white",
                  fontWeight: "800",
                  fontSize: "16px",
                }}>
                  {item.year}
                </span>
              </div>

              <div style={{ flex: 1, minWidth: "280px" }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}