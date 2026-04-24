import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin,  setIsAdmin]  = useState(false);
  const location = useLocation();

  const { language, darkMode, toggleLanguage, toggleDarkMode, t } = useApp();

  const navBg       = darkMode ? "#1e293b" : "white";
  const linkColor   = darkMode ? "#94a3b8" : "#4b5563";
  const activeBg    = darkMode ? "#134e4a" : "#f0fdf9";
  const activeColor = "#14b8a6";
  const borderColor = darkMode ? "#334155" : "#e5e7eb";

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem("adminToken");
      setIsAdmin(!!token);
    };
    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    const interval = setInterval(checkAdmin, 2000);
    return () => {
      window.removeEventListener("storage", checkAdmin);
      clearInterval(interval);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event("storage"));
  };

  const links = [
    { label: t.home,     path: "/" },
    { label: t.services, path: "/services" },
    { label: t.pricing,  path: "/pricing" },
    { label: t.about,    path: "/about" },
    { label: t.reviews,  path: "/reviews" },
    { label: t.contact,  path: "/contact" },
  ];

  return (
    <nav style={{
      backgroundColor: navBg,
      boxShadow: darkMode
        ? "0 1px 3px rgba(0,0,0,0.4)"
        : "0 1px 3px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 9999,
      transition: "background-color 0.2s",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}>

          {/* Logo inline SVG */}
          <Link to="/" style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}>
            <svg
              width="52"
              height="52"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="0" width="200" height="200" rx="36" fill="#134e4a"/>
              <rect x="144" y="8" width="44" height="44" rx="22" fill="#0d9488" opacity="0.5"/>
              <text
                x="100" y="110"
                fontFamily="ui-sans-serif,system-ui,sans-serif"
                fontSize="72"
                fontWeight="700"
                fill="white"
                textAnchor="middle"
              >
                J&amp;S
              </text>
              <text
                x="100" y="150"
                fontFamily="ui-sans-serif,system-ui,sans-serif"
                fontSize="22"
                fontWeight="600"
                fill="#5eead4"
                textAnchor="middle"
                letterSpacing="4"
              >
                PALVELUT
              </text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop">

            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textDecoration: "none",
                  backgroundColor: location.pathname === link.path
                    ? activeBg : "transparent",
                  color: location.pathname === link.path
                    ? activeColor : linkColor,
                  transition: "all 0.15s",
                }}
              >
                {link.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/js-admin-2024"
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textDecoration: "none",
                  backgroundColor: activeBg,
                  color: activeColor,
                }}
              >
                {"⚙️"} {t.admin}
              </Link>
            )}

            {isAdmin && (
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                }}
              >
                {"🚪"} {t.logout}
              </button>
            )}

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "700",
                border: `1.5px solid ${borderColor}`,
                cursor: "pointer",
                backgroundColor: "transparent",
                color: activeColor,
                letterSpacing: "0.04em",
              }}
            >
              {language === "en" ? "🇫🇮 FI" : "🇬🇧 EN"}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: `1.5px solid ${borderColor}`,
                cursor: "pointer",
                backgroundColor: "transparent",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Book Now */}
            <Link
              to="/booking"
              style={{
                marginLeft: "8px",
                backgroundColor: "#14b8a6",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                padding: "8px 20px",
                borderRadius: "12px",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(20,184,166,0.3)",
                whiteSpace: "nowrap",
              }}
            >
              {t.bookNow}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: "transparent",
              color: linkColor,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}
        style={{ backgroundColor: navBg }}
      >
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "500",
              textDecoration: "none",
              marginBottom: "2px",
              backgroundColor: location.pathname === link.path
                ? activeBg : "transparent",
              color: location.pathname === link.path
                ? activeColor : linkColor,
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* Language toggle mobile */}
        <button
          onClick={() => { toggleLanguage(); setMenuOpen(false); }}
          style={{
            display: "block",
            width: "100%",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            border: `1px solid ${borderColor}`,
            cursor: "pointer",
            marginBottom: "8px",
            textAlign: "left",
            backgroundColor: "transparent",
            color: activeColor,
          }}
        >
          {language === "en" ? "🇫🇮 Vaihda suomeksi" : "🇬🇧 Switch to English"}
        </button>

        {/* Dark mode toggle mobile */}
        <button
          onClick={() => { toggleDarkMode(); setMenuOpen(false); }}
          style={{
            display: "block",
            width: "100%",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            border: `1px solid ${borderColor}`,
            cursor: "pointer",
            marginBottom: "8px",
            textAlign: "left",
            backgroundColor: "transparent",
            color: linkColor,
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Admin + Logout mobile */}
        {isAdmin && (
          <>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "500",
                textDecoration: "none",
                marginBottom: "2px",
                color: activeColor,
                backgroundColor: activeBg,
              }}
            >
              {"⚙️"} {t.admin}
            </Link>
            <button
              onClick={handleLogout}
              style={{
                display: "block",
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "500",
                border: "none",
                cursor: "pointer",
                marginBottom: "2px",
                textAlign: "left",
                backgroundColor: "#fee2e2",
                color: "#dc2626",
              }}
            >
              {"🚪"} {t.logout}
            </button>
          </>
        )}

        {/* Book Now mobile */}
        <Link
          to="/booking"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "block",
            marginTop: "8px",
            backgroundColor: "#14b8a6",
            color: "white",
            textAlign: "center",
            fontSize: "15px",
            fontWeight: "600",
            padding: "13px 20px",
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          {t.bookNow}
        </Link>
      </div>
    </nav>
  );
}
