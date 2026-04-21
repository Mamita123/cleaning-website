import React from "react";

export default function BookingConfirm({ booking, onReset }) {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      backgroundColor: "var(--bg-primary)",
    }}>
      <div style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "24px",
        padding: "48px 40px",
        maxWidth: "520px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        border: "1px solid var(--border-color)",
      }}>

        {/* ✅ Success icon */}
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#f0fdf9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          margin: "0 auto 24px",
          border: "3px solid #99f6e0",
        }}>
          ✅
        </div>

        <h2 style={{
          fontSize: "24px",
          fontWeight: "800",
          color: "var(--text-heading)",
          marginBottom: "12px",
        }}>
          Booking Confirmed!
        </h2>

        <p style={{
          fontSize: "15px",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "32px",
        }}>
          Thank you {booking.name}! Your cleaning is booked.
          We will send a confirmation to{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            {booking.email}
          </strong>.
        </p>

        {/* ✅ Booking summary */}
        <div style={{
          backgroundColor: "var(--bg-primary)",
          borderRadius: "16px",
          padding: "20px 24px",
          textAlign: "left",
          marginBottom: "28px",
          border: "1px solid var(--border-color)",
        }}>
          {[
            { label: "Service",  value: booking.service },
            { label: "Date",     value: booking.date },
            { label: "Time",     value: booking.time },
            { label: "Address",  value: booking.address },
          ].map((item) => (
            <div key={item.label} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid var(--border-color)",
              fontSize: "14px",
            }}>
              <span style={{
                color: "var(--text-secondary)",
                fontWeight: "500",
              }}>
                {item.label}
              </span>
              <span style={{
                color: "var(--text-primary)",
                fontWeight: "600",
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Book another button */}
        <button
          onClick={onReset}
          style={{
            backgroundColor: "#14b8a6",
            color: "white",
            fontSize: "15px",
            fontWeight: "700",
            padding: "14px 32px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            width: "100%",
          }}
        >
          📅 Book Another Cleaning
        </button>

      </div>
    </div>
  );
}