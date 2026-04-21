import React from "react";

const activities = [
  {
    emoji: "📅",
    text: "New booking from Sarah M.",
    sub: "Regular Home Cleaning — €49",
    time: "2 mins ago",
  },
  {
    emoji: "✅",
    text: "Booking BK003 confirmed",
    sub: "Office Cleaning for Lisa T.",
    time: "15 mins ago",
  },
  {
    emoji: "⭐",
    text: "New 5-star review received",
    sub: "From James K. — Deep Cleaning",
    time: "1 hour ago",
  },
  {
    emoji: "👤",
    text: "New customer registered",
    sub: "Anna P. — Helsinki",
    time: "2 hours ago",
  },
  {
    emoji: "💰",
    text: "Payment received — €129",
    sub: "Move Out Cleaning — Tom R.",
    time: "3 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      border: "1px solid var(--border-color)",
    }}>
      <h3 style={{
        fontSize: "18px",
        fontWeight: "800",
        color: "var(--text-heading)",
        marginBottom: "20px",
      }}>
        Recent Activity
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {activities.map((item, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 16px",
            backgroundColor: "var(--bg-primary)",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
          }}>
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>
              {item.emoji}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-primary)",
                marginBottom: "2px",
              }}>
                {item.text}
              </div>
              <div style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
              }}>
                {item.sub}
              </div>
            </div>
            <div style={{
              fontSize: "11px",
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
            }}>
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}