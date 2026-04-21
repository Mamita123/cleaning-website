import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function ServiceProcess() {
  const { t } = useLanguage();

  const steps = [
    { step: "01", emoji: "📱", title: t.step1Title, description: t.step1Desc },
    { step: "02", emoji: "📅", title: t.step2Title, description: t.step2Desc },
    { step: "03", emoji: "✅", title: t.step3Title, description: t.step3Desc },
    { step: "04", emoji: "⭐", title: t.step4Title, description: t.step4Desc },
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
            {t.howItWorks}
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--text-secondary)",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            {t.howSubtitle}
          </p>
        </div>

        {/* ✅ Steps grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}>
          {steps.map((step) => (
            <div key={step.step} style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "20px",
              padding: "32px 24px",
              textAlign: "center",
              border: "1px solid var(--border-color)",
            }}>
              {/* ✅ New — uses translation */}
              <div style={{
                fontSize: "12px",
                fontWeight: "800",
                color: "#14b8a6",
                letterSpacing: "0.1em",
                marginBottom: "12px",
              }}>
                {t.step} {step.step}
              </div>
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
                {step.emoji}
              </div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "var(--text-primary)",
                marginBottom: "10px",
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ CTA */}
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <a href="/booking" style={{
            backgroundColor: "#14b8a6",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            padding: "16px 40px",
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "0 4px 15px rgba(20,184,166,0.35)",
            display: "inline-block",
          }}>
            📅 {t.bookYourCleaning}
          </a>
        </div>

      </div>
    </section>
  );
}