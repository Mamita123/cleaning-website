import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      emoji: "🏠",
      title: t.homeClean,
      price: "From €49",
      description: t.ecoDesc,
      badge: "Most Popular",
      badgeColor: "#0d9488",
    },
    {
      emoji: "🧹",
      title: t.deepClean,
      price: "From €99",
      description: t.guarDesc,
      badge: "Recommended",
      badgeColor: "#7c3aed",
    },
    {
      emoji: "🏢",
      title: t.officeClean,
      price: "From €79",
      description: t.vettedDesc,
      badge: "Business",
      badgeColor: "#2563eb",
    },
    {
      emoji: "🛁",
      title: "Move In / Move Out",
      price: "From €129",
      description: t.transDesc,
      badge: "Thorough",
      badgeColor: "#d97706",
    },
  ];

  return (
    <section style={{
      backgroundColor: "var(--bg-primary)",
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
            {t.ourServices}
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            {t.ourServicesDesc}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          marginBottom: "48px",
        }}>
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{
                display: "inline-block",
                backgroundColor: service.badgeColor,
                color: "white",
                fontSize: "11px",
                fontWeight: "700",
                padding: "3px 10px",
                borderRadius: "999px",
                marginBottom: "16px",
              }}>
                {service.badge}
              </div>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
                {service.emoji}
              </div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}>
                {service.description}
              </p>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#0d9488",
                }}>
                  {service.price}
                </span>
                <a href="/booking" style={{
                  backgroundColor: "var(--bg-primary)",
                  color: "#0d9488",
                  fontSize: "13px",
                  fontWeight: "600",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  border: "1px solid var(--border-color)",
                }}>
                  {t.bookNowBtn} →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="/services" style={{
            backgroundColor: "#14b8a6",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            padding: "14px 36px",
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "0 4px 15px rgba(20,184,166,0.35)",
            display: "inline-block",
          }}>
            {t.viewAll}
          </a>
        </div>

      </div>
    </section>
  );
}