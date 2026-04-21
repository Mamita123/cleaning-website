import React from "react";

const navItems = [
  { icon: "📊", label: "Dashboard",  key: "dashboard" },
  { icon: "📅", label: "Bookings",   key: "bookings"  },
  { icon: "👥", label: "Customers",  key: "customers" },
  { icon: "🧹", label: "Services",   key: "services"  },
  { icon: "⭐", label: "Reviews",    key: "reviews"   },
  { icon: "⚙️", label: "Settings",   key: "settings"  },
];

export default function AdminNav({ activePage, onNavigate, onLogout }) {
  return (
    <aside style={{
      width: "240px",
      minHeight: "100vh",
      // ✅ Dark sidebar — same in both modes
      backgroundColor: "#134e4a",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>

      {/* ✅ Logo */}
      <div style={{
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
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
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Navigation */}
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

      {/* ✅ Logout */}
      <div style={{
        padding: "16px 12px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "rgba(239,68,68,0.15)",
            color: "#fca5a5",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}