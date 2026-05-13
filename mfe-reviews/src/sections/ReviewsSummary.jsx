import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function ReviewsSummary() {
  const { t } = useLanguage();

  return (
    <section style={{
      backgroundColor: "var(--bg-secondary)",
      padding: "80px 24px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* CTA banner only */}
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
            {t.joinCustomers}
          </h3>
          <p style={{
            fontSize: "16px",
            color: "#99f6e0",
            marginBottom: "28px",
            lineHeight: "1.6",
          }}>
            {t.joinDesc2}
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
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              {"📅"} {t.bookCleaning}
            </a>
            <a href="/services" style={{
              backgroundColor: "transparent",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.6)",
              display: "inline-block",
            }}>
              {"🔍"} {t.viewServices}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}