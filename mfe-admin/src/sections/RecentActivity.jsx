import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function RecentActivity() {
  const { t, language } = useLanguage();

  // ✅ Activities defined inside component so they re-render on language change
  const activities = [
    {
      emoji: "📅",
      text: language === "fi"
        ? "Uusi varaus Sarah M.:lta"
        : "New booking from Sarah M.",
      sub: language === "fi"
        ? "Kotisiivous — 49 euroa"
        : "Regular Home Cleaning — €49",
      time: "2 mins ago",
    },
    {
      emoji: "✅",
      text: language === "fi"
        ? "Varaus BK003 vahvistettu"
        : "Booking BK003 confirmed",
      sub: language === "fi"
        ? "Toimistosiivous Lisa T.:lle"
        : "Office Cleaning for Lisa T.",
      time: "15 mins ago",
    },
    {
      emoji: "⭐",
      text: language === "fi"
        ? "Uusi 5 tahden arvostelu"
        : "New 5-star review received",
      sub: language === "fi"
        ? "James K.:lta — Syvasiivous"
        : "From James K. — Deep Cleaning",
      time: "1 hour ago",
    },
    {
      emoji: "👤",
      text: language === "fi"
        ? "Uusi asiakas rekisteroitynyt"
        : "New customer registered",
      sub: language === "fi"
        ? "Anna P. — Helsinki"
        : "Anna P. — Helsinki",
      time: "2 hours ago",
    },
    {
      emoji: "💰",
      text: language === "fi"
        ? "Maksu vastaanotettu — 129 euroa"
        : "Payment received — €129",
      sub: language === "fi"
        ? "Muuttosaately — Tom R."
        : "Move Out Cleaning — Tom R.",
      time: "3 hours ago",
    },
  ];

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
        {t.recentActivity}
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