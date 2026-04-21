import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { useLanguage } from "../hooks/useLanguage";

export default function ServicesList() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  // ✅ Services data using translations
  const allServices = [
    {
      id: 1, emoji: "🏠",
      title: t.homeClean,
      price: `${t.from} €49`,duration: "2-3 h",
      badge: "Most Popular", badgeColor: "#0d9488",
      category: "home",
      description: t.ecoDesc,
      includes: [t.vettedTitle, t.flexTitle, t.transTitle, t.guarTitle, t.easyTitle],
    },
    {
      id: 2, emoji: "🧹",
      title: t.deepClean,
    price: `${t.from} €99`, duration: "4-6 h",
      badge: "Thorough", badgeColor: "#7c3aed",
      category: "home",
      description: t.guarDesc,
      includes: [t.vettedTitle, t.flexTitle, t.transTitle, t.guarTitle, t.easyTitle],
    },
    {
      id: 3, emoji: "🏢",
      title: t.officeClean,
      price: `${t.from} €79`, duration: "2-4 h",
      badge: "Business", badgeColor: "#2563eb",
      category: "office",
      description: t.vettedDesc,
      includes: [t.vettedTitle, t.flexTitle, t.transTitle, t.guarTitle],
    },
    {
  id: 4, emoji: "🛁",
  // ✅ Now uses translation key
  title: t.moveInOut,
  price: `${t.from} €129`,duration: "5-8 h",
  badge: "Complete", badgeColor: "#d97706",
  category: "specialist",
  description: t.transDesc,
  includes: [t.vettedTitle, t.flexTitle, t.transTitle, t.guarTitle, t.easyTitle],
},
{
  id: 5, emoji: "🌿",
  title: t.ecoFriendly,
  price: `${t.from} €59`, duration: "2-3 h",
  badge: "Green", badgeColor: "#059669",
  category: "specialist",
  description: t.ecoDesc,
  includes: [t.ecoTitle, t.vettedTitle, t.flexTitle, t.guarTitle],
},
{
  id: 6, emoji: "🪟",
  // ✅ Now uses translation key
  title: t.windowCleaning,
  price: `${t.from} €39`, duration: "1-2 h",
  badge: "Specialist", badgeColor: "#0891b2",
  category: "specialist",
  description: t.flexDesc,
  includes: [t.vettedTitle, t.transTitle, t.guarTitle],
},
  ];

  // ✅ Filter categories using translations
  const categories = [
    { key: "all",        label: t.allServices },
    { key: "home",       label: t.homeFilter },
    { key: "office",     label: t.officeFilter },
    { key: "specialist", label: t.specialistFilter },
  ];

  const filtered = activeCategory === "all"
    ? allServices
    : allServices.filter(s => s.category === activeCategory);

  return (
    <section style={{
      padding: "72px 24px",
      backgroundColor: "var(--bg-primary)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ✅ Filter tabs */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "48px",
        }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: "10px 24px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
                backgroundColor: activeCategory === cat.key
                  ? "#14b8a6" : "var(--bg-card)",
                color: activeCategory === cat.key
                  ? "white" : "var(--text-secondary)",
                boxShadow: activeCategory === cat.key
                  ? "0 2px 8px rgba(20,184,166,0.35)"
                  : "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ✅ Services grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} bookNow={t.bookNowBtn} />
          ))}
        </div>

      </div>
    </section>
  );
}