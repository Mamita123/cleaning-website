import React from "react";

export default function ServiceCard({ service, bookNow = "Book Now" }) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "1px solid var(--border-color)",
        transition: "transform 0.2s, box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
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
      {/* ✅ Top banner */}
      <div style={{
        backgroundColor: "var(--bg-primary)",
        padding: "32px 28px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}>
        <span style={{ fontSize: "3rem" }}>{service.emoji}</span>
        <div>
          <span style={{
            display: "inline-block",
            backgroundColor: service.badgeColor,
            color: "white",
            fontSize: "11px",
            fontWeight: "700",
            padding: "2px 10px",
            borderRadius: "999px",
            marginBottom: "6px",
          }}>
            {service.badge}
          </span>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text-primary)",
            margin: 0,
          }}>
            {service.title}
          </h3>
        </div>
      </div>

      {/* ✅ Body */}
      <div style={{
        padding: "24px 28px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        <p style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "20px",
          flex: 1,
        }}>
          {service.description}
        </p>

        {/* ✅ Includes */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
          {service.includes.map((item) => (
            <li key={item} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}>
              <span style={{ color: "#14b8a6", fontWeight: "700" }}>✓</span>
              {item}
            </li>
          ))}
        </ul>

        {/* ✅ Price + Book */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "16px",
          borderTop: "1px solid var(--border-color)",
        }}>
          <div>
            <div style={{
              fontSize: "22px",
              fontWeight: "800",
              color: "#0d9488",
            }}>
              {service.price}
            </div>
            <div style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
            }}>
              {service.duration}
            </div>
          </div>
          <a href="/booking" style={{
            backgroundColor: "#14b8a6",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            padding: "10px 20px",
            borderRadius: "10px",
            textDecoration: "none",
          }}>
            {bookNow}
          </a>
        </div>
      </div>
    </div>
  );
}