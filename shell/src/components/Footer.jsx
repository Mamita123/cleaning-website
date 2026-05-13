import React from "react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();

  return (
    <footer style={{
      backgroundColor: "#134e4a",
      color: "white",
      padding: "64px 24px 32px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Top section — 4 columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "48px",
        }}>

          {/* Column 1 — Company info */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}>
              <div style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#0d9488",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "800",
                color: "white",
              }}>
                J&amp;S
              </div>
              <div>
                <div style={{ fontWeight: "800", fontSize: "16px", color: "white" }}>
                  J &amp; S Palvelut Oy
                </div>
                <div style={{ fontSize: "11px", color: "#5eead4", fontWeight: "500" }}>
                  Siivouspalvelu · Helsinki
                </div>
              </div>
            </div>

            <p style={{
              fontSize: "14px",
              color: "#99f6e0",
              lineHeight: "1.7",
              marginBottom: "16px",
            }}>
              {t.heroSubtitle}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { icon: "📞", text: "045 181 2636 (Shapan)" },
                { icon: "📞", text: "040 593 3052 (Jamanta)" },
                { icon: "📧", text: "mahmudul.shapan7@gmail.com" },
                { icon: "📍", text: "Kankarepolku 5 H 451, 00770 Helsinki" },
              ].map((item) => (
                <div key={item.text} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#99f6e0",
                }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
              marginBottom: "20px",
            }}>
              {t.quickLinks}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: t.home,     href: "/" },
                { label: t.services, href: "/services" },
                { label: t.pricing,  href: "/pricing" },
                { label: t.about,    href: "/about" },
                { label: t.reviews,  href: "/reviews" },
                { label: t.contact,  href: "/contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "14px",
                    color: "#99f6e0",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "white"}
                  onMouseLeave={e => e.currentTarget.style.color = "#99f6e0"}
                >
                  <span>{">"}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
              marginBottom: "20px",
            }}>
              {t.services}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: t.homeClean,      href: "/services/home-cleaning" },
                { label: t.deepClean,      href: "/services/deep-cleaning" },
                { label: t.officeClean,    href: "/services/office-cleaning" },
                { label: t.moveInOut,      href: "/services/move-in-out" },
                { label: t.windowCleaning, href: "/services/window-cleaning" },
                { label: t.storeCleaning,  href: "/services/store-cleaning" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "14px",
                    color: "#99f6e0",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "white"}
                  onMouseLeave={e => e.currentTarget.style.color = "#99f6e0"}
                >
                  <span>{">"}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4 — Working hours */}
          <div>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
              marginBottom: "20px",
            }}>
              {t.workingHours}
            </h3>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              padding: "6px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "16px",
            }}>
              <span style={{ color: "#99f6e0" }}>{t.day}</span>
              <span style={{
                color: "#14b8a6",
                fontWeight: "900",
                fontSize: "16px",
              }}>
                24/7
              </span>
            </div>

            {/* Open badge */}
            <div style={{
              backgroundColor: "rgba(20,184,166,0.2)",
              border: "1px solid rgba(20,184,166,0.4)",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#5eead4",
              fontWeight: "600",
              marginBottom: "20px",
            }}>
              {"🟢"} {t.openEveryday}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "28px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "13px", color: "#99f6e0" }}>
            {"©"} {new Date().getFullYear()} J &amp; S Palvelut Oy {t.allRightsReserved}
          </div>
        </div>

      </div>
    </footer>
  );
}
