import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function StatsCards() {
  const { t } = useLanguage();

  const stats = [
    {
      emoji: "📅",
      label: t.totalBookings,
      value: "248",
      change: t.thisMonth,
      accent: "#0d9488",
    },
    {
      emoji: "💰",
      label: t.totalRevenue,
      value: "€18,540",
      change: t.thisMonth,
      accent: "#2563eb",
    },
    {
      emoji: "👥",
      label: t.activeCustomers,
      value: "184",
      change: t.thisWeek,
      accent: "#d97706",
    },
    {
      emoji: "⭐",
      label: t.averageRating,
      value: "4.9",
      change: t.basedOn,
      accent: "#7c3aed",
    },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "32px",
    }}>
      {stats.map((stat) => (
        <div key={stat.label} style={{
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
              {"↑"}
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