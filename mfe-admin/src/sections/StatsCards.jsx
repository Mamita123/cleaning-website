import React from "react";

const stats = [
  {
    emoji: "📅",
    label: "Total Bookings",
    value: "248",
    change: "+12% this month",
    color: "#f0fdf9",
    accent: "#0d9488",
  },
  {
    emoji: "💰",
    label: "Total Revenue",
    value: "€18,540",
    change: "+8% this month",
    color: "#e0f2fe",
    accent: "#2563eb",
  },
  {
    emoji: "👥",
    label: "Active Customers",
    value: "184",
    change: "+5 new this week",
    color: "#fef3c7",
    accent: "#d97706",
  },
  {
    emoji: "⭐",
    label: "Average Rating",
    value: "4.9",
    change: "Based on 2,000 reviews",
    color: "#ede9fe",
    accent: "#7c3aed",
  },
];

export default function StatsCards() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "32px",
    }}>
      {stats.map((stat) => (
        <div key={stat.label} style={{
          // ✅ Uses CSS variable for card background
          backgroundColor: "var(--bg-card)",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid var(--border-color)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}>
            <span style={{ fontSize: "1.75rem" }}>{stat.emoji}</span>
            <span style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#059669",
              backgroundColor: "#dcfce7",
              padding: "2px 8px",
              borderRadius: "999px",
            }}>
              ↑
            </span>
          </div>
          <div style={{
            fontSize: "28px",
            fontWeight: "800",
            color: stat.accent,
            marginBottom: "4px",
            lineHeight: "1",
          }}>
            {stat.value}
          </div>
          <div style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}>
            {stat.label}
          </div>
          <div style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
          }}>
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
}