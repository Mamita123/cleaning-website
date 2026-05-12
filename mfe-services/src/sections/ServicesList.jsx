import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const slugMap = {
  1: "home-cleaning",
  2: "deep-cleaning",
  3: "office-cleaning",
  4: "move-in-out",
  5: "window-cleaning",
  6: "restaurant-bar",
  7: "store-cleaning",
};

export default function ServicesList() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const allServices = [
    {
      id: 1,
      emoji: "🏠",
      title: t.homeClean,
      price: "35",
      badge: language === "fi" ? "Suosituin" : "Most Popular",
      badgeColor: "#0d9488",
      category: "home",
      description: language === "fi"
        ? "Ammattimainen kotisiivous raataaloituna tarpeisiisi."
        : "Professional home cleaning tailored to your needs.",
    },
    {
      id: 2,
      emoji: "✨",
      title: t.deepClean,
      price: "45",
      badge: language === "fi" ? "Perusteellinen" : "Thorough",
      badgeColor: "#7c3aed",
      category: "home",
      description: language === "fi"
        ? "Perusteellinen siivous joka nurkkaan ja sopukkaan."
        : "Thorough cleaning reaching every corner and surface.",
    },
    {
      id: 3,
      emoji: "🏢",
      title: t.officeClean,
      price: "38",
      badge: language === "fi" ? "Yritys" : "Business",
      badgeColor: "#2563eb",
      category: "office",
      description: language === "fi"
        ? "Pida toimistosi siistina ja tiimisi tuottavana."
        : "Keep your office clean and your team productive.",
    },
    {
      id: 4,
      emoji: "📦",
      title: t.moveInOut,
      price: "45",
      badge: language === "fi" ? "Taysi palvelu" : "Complete",
      badgeColor: "#d97706",
      category: "specialist",
      description: language === "fi"
        ? "Tayydellinen siivous muuton yhteydessal."
        : "Complete cleaning for moving in or out.",
    },
    {
      id: 5,
      emoji: "🪟",
      title: t.windowCleaning,
      price: "35",
      badge: language === "fi" ? "Erikoispalvelu" : "Specialist",
      badgeColor: "#0891b2",
      category: "specialist",
      description: language === "fi"
        ? "Kirkkaat ikkunat sisalta ja ulkoa."
        : "Crystal clear windows inside and outside.",
    },
    {
      id: 6,
      emoji: "🍽️",
      title: language === "fi" ? "Ravintola ja baari" : "Restaurant and Bar",
      price: "40",
      badge: language === "fi" ? "Yritys" : "Commercial",
      badgeColor: "#059669",
      category: "office",
      description: language === "fi"
        ? "Ammattimainen siivous ravintoloille ja baareille."
        : "Professional cleaning for restaurants and bars.",
    },
    {
      id: 7,
      emoji: "🏪",
      title: t.storeCleaning,
      price: "38",
      badge: language === "fi" ? "Yritys" : "Commercial",
      badgeColor: "#7c3aed",
      category: "office",
      description: language === "fi"
        ? "Ammattimainen myymalan siivous asiakkaillesi."
        : "Professional store and shop cleaning for your customers.",
    },
  ];

  const categories = [
    { key: "all",        label: t.allServices },
    { key: "home",       label: t.homeFilter },
    { key: "office",     label: t.officeFilter },
    { key: "specialist", label: t.specialistFilter },
  ];

  const filtered = activeCategory === "all"
    ? allServices
    : allServices.filter(function(s) { return s.category === activeCategory; });

  return (
    <section style={{ padding: "72px 24px", backgroundColor: "var(--bg-primary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Filter tabs */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "10px",
          justifyContent: "center", marginBottom: "48px",
        }}>
          {categories.map(function(cat) {
            return (
              <button
                key={cat.key}
                onClick={function() { setActiveCategory(cat.key); }}
                style={{
                  padding: "10px 24px", borderRadius: "999px",
                  fontSize: "14px", fontWeight: "600",
                  border: "none", cursor: "pointer",
                  transition: "all 0.15s",
                  backgroundColor: activeCategory === cat.key ? "#14b8a6" : "var(--bg-card)",
                  color: activeCategory === cat.key ? "white" : "var(--text-secondary)",
                  boxShadow: activeCategory === cat.key
                    ? "0 2px 8px rgba(20,184,166,0.35)"
                    : "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {filtered.map(function(service) {
            return (
              <div
                key={service.id}
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: "1px solid var(--border-color)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                }}
              >
                {/* Top */}
                <div style={{
                  backgroundColor: "var(--bg-primary)",
                  padding: "32px 28px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}>
                  <span style={{ fontSize: "3rem" }}>{service.emoji}</span>
                  <div>
                    <span style={{
                      display: "inline-block",
                      backgroundColor: service.badgeColor,
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "2px 10px",
                      borderRadius: "999px",
                      marginBottom: "6px",
                    }}>
                      {service.badge}
                    </span>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "var(--text-primary)",
                      margin: 0,
                    }}>
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div style={{
                  padding: "24px 28px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <p style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.7",
                    marginBottom: "20px",
                    flex: 1,
                  }}>
                    {service.description}
                  </p>

                  {/* Price + Buttons — no duration */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border-color)",
                  }}>
                    <div style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      color: "#0d9488",
                    }}>
                      {service.price}{language === "fi" ? " e/tunti" : " e/hour"}
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <a
                        href={"/services/" + slugMap[service.id]}
                        style={{
                          backgroundColor: "transparent",
                          color: "#0d9488",
                          fontSize: "13px",
                          fontWeight: "600",
                          padding: "8px 14px",
                          borderRadius: "10px",
                          border: "1.5px solid #0d9488",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        {language === "fi" ? "Lisatietoja" : "Details"}
                      </a>
                      <a
                        href="/booking"
                        style={{
                          backgroundColor: "#14b8a6",
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "600",
                          padding: "8px 14px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        {language === "fi" ? "Varaa" : "Book"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* VAT note only — no minimum hours */}
        <div style={{
          textAlign: "center",
          marginTop: "48px",
          padding: "20px",
          backgroundColor: "var(--bg-card)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
        }}>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
            {language === "fi"
              ? "Kaikki hinnat ilman ALV 25,5%"
              : "All prices exclude VAT 25.5%"
            }
          </p>
        </div>

      </div>
    </section>
  );
}
