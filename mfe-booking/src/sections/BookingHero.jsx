import React from "react";

export default function BookingHero() {
  return (
    <section style={{
      backgroundColor: "var(--bg-primary)",
      padding: "56px 24px",
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
          marginBottom: "20px",
        }}>
          <span>📅</span>
          <span>Easy Online Booking</span>
        </div>

        {/* ✅ Headline */}
        <h1 style={{
          fontSize: "clamp(1.75rem, 4vw, 3rem)",
          fontWeight: "800",
          color: "var(--text-heading)",
          lineHeight: "1.15",
          marginBottom: "16px",
        }}>
          Book Your{" "}
          <span style={{ color: "#14b8a6" }}>Cleaning Service</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.1rem)",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
        }}>
          Choose your service, pick a date and time, and we will
          take care of the rest. Takes less than 2 minutes!
        </p>

        {/* ✅ Steps indicator */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          marginTop: "24px",
        }}>
          {[
            "1. Choose service",
            "2. Pick date & time",
            "3. Your details",
            "4. Confirm",
          ].map((step) => (
            <div key={step} style={{
              backgroundColor: "var(--bg-card)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-primary)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              border: "1px solid var(--border-color)",
            }}>
              {step}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}