import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function AdminNav({ activePage, onNavigate, onLogout }) {
  const { t, language } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fi" : "en";
    localStorage.setItem("language", newLang);
    window.dispatchEvent(new Event("storage"));
  };

  const navItems = [
    { icon: "📊", label: t.dashboard, key: "dashboard" },
    { icon: "📅", label: t.bookings,  key: "bookings"  },
    { icon: "👥", label: t.customers, key: "customers" },
    { icon: "🧹", label: t.services,  key: "services"  },
    { icon: "⭐", label: t.reviews,   key: "reviews"   },
    { icon: "⚙️", label: t.settings,  key: "settings"  },
  ];

  return (
    <aside style={{
      width: "220px",
      minHeight: "100vh",
      backgroundColor: "#134e4a",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>

      {/* ✅ Logo + Language toggle in header */}
      <div style={{
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        {/* ✅ Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}>
          <span style={{ fontSize: "24px" }}>🧹</span>
          <div>
            <div style={{
              color: "white",
              fontWeight: "800",
              fontSize: "15px",
            }}>
              J & S Palvelut
            </div>
            <div style={{
              color: "#5eead4",
              fontSize: "11px",
              fontWeight: "500",
            }}>
              {t.adminPanel}
            </div>
          </div>
        </div>

        {/* ✅ Language toggle — in header area */}
        <button
          onClick={toggleLanguage}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "8px 12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.15)",
            cursor: "pointer",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "#5eead4",
            fontSize: "13px",
            fontWeight: "600",
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: "16px" }}>
            {language === "en" ? "🇫🇮" : "🇬🇧"}
          </span>
          <span>
            {language === "en" ? "Vaihda suomeksi" : "Switch to English"}
          </span>
        </button>
      </div>

      {/* ✅ Navigation links */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              marginBottom: "4px",
              transition: "all 0.15s",
              backgroundColor: activePage === item.key
                ? "rgba(20,184,166,0.2)"
                : "transparent",
              color: activePage === item.key
                ? "#5eead4"
                : "rgba(255,255,255,0.7)",
            }}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span style={{
              fontSize: "14px",
              fontWeight: activePage === item.key ? "700" : "500",
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

    </aside>
  );
}