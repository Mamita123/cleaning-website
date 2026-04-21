import React, { useState } from "react";

// ✅ Default services — same as frontend
const defaultServices = [
  {
    id: 1, emoji: "🏠", title: "Regular Home Cleaning",
    price: "From €49", duration: "2–3 hrs",
    badge: "Most Popular", category: "home", isActive: true,
    description: "Keep your home consistently clean with our regular cleaning service.",
    includes: ["Vacuuming", "Mopping", "Dusting", "Bathroom cleaning", "Kitchen wipe-down"],
  },
  {
    id: 2, emoji: "🧹", title: "Deep Cleaning",
    price: "From €99", duration: "4–6 hrs",
    badge: "Thorough", category: "home", isActive: true,
    description: "A comprehensive top-to-bottom clean covering every corner.",
    includes: ["Everything in regular", "Inside oven/fridge", "Window cleaning", "Deep bathroom scrub"],
  },
  {
    id: 3, emoji: "🏢", title: "Office Cleaning",
    price: "From €79", duration: "2–4 hrs",
    badge: "Business", category: "office", isActive: true,
    description: "Professional cleaning for offices and commercial spaces.",
    includes: ["Desk cleaning", "Vacuuming", "Kitchen area", "Toilets", "Waste removal"],
  },
  {
    id: 4, emoji: "🛁", title: "Move In / Move Out",
    price: "From €129", duration: "5–8 hrs",
    badge: "Complete", category: "specialist", isActive: true,
    description: "Full property clean for tenants and landlords.",
    includes: ["Full deep clean", "Inside cupboards", "Appliances", "Window frames"],
  },
  {
    id: 5, emoji: "🌿", title: "Eco-Friendly Cleaning",
    price: "From €59", duration: "2–3 hrs",
    badge: "Green", category: "specialist", isActive: true,
    description: "Same great clean using only certified eco-friendly products.",
    includes: ["Natural products only", "No harsh chemicals", "Safe for pets and kids"],
  },
  {
    id: 6, emoji: "🪟", title: "Window Cleaning",
    price: "From €39", duration: "1–2 hrs",
    badge: "Specialist", category: "specialist", isActive: true,
    description: "Crystal-clear windows inside and out.",
    includes: ["Interior windows", "Exterior windows", "Window frames", "Streak-free finish"],
  },
];

export default function ServicesPage() {
  const [services,    setServices]    = useState(defaultServices);
  const [editingId,   setEditingId]   = useState(null);
  const [editForm,    setEditForm]    = useState({});

  // ✅ Start editing a service
  const startEdit = (service) => {
    setEditingId(service.id);
    setEditForm({ ...service });
  };

  // ✅ Save edited service
  const saveEdit = () => {
    setServices(prev =>
      prev.map(s => s.id === editingId ? { ...editForm } : s)
    );
    setEditingId(null);
  };

  // ✅ Toggle service active/inactive
  const toggleActive = (id) => {
    setServices(prev =>
      prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    );
  };

  return (
    <div>
      {/* ✅ Page header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "800",
          color: "#134e4a",
          marginBottom: "4px",
        }}>
          🧹 Services
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Manage your cleaning services and prices
        </p>
      </div>

      {/* ✅ Services grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
      }}>
        {services.map(service => (
          <div
            key={service.id}
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: `1px solid ${service.isActive ? "#f3f4f6" : "#fecaca"}`,
              opacity: service.isActive ? 1 : 0.7,
            }}
          >
            {/* ✅ Editing mode */}
            {editingId === service.id ? (
              <div>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "4px" }}>
                    Title
                  </label>
                  <input
                    value={editForm.title}
                    onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
                    style={{
                      width: "100%", padding: "8px 12px", borderRadius: "8px",
                      border: "1.5px solid #e5e7eb", fontSize: "14px",
                      outline: "none", boxSizing: "border-box",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "4px" }}>
                    Price
                  </label>
                  <input
                    value={editForm.price}
                    onChange={e => setEditForm(p => ({ ...p, price: e.target.value }))}
                    style={{
                      width: "100%", padding: "8px 12px", borderRadius: "8px",
                      border: "1.5px solid #e5e7eb", fontSize: "14px",
                      outline: "none", boxSizing: "border-box",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "4px" }}>
                    Duration
                  </label>
                  <input
                    value={editForm.duration}
                    onChange={e => setEditForm(p => ({ ...p, duration: e.target.value }))}
                    style={{
                      width: "100%", padding: "8px 12px", borderRadius: "8px",
                      border: "1.5px solid #e5e7eb", fontSize: "14px",
                      outline: "none", boxSizing: "border-box",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "4px" }}>
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                    rows={3}
                    style={{
                      width: "100%", padding: "8px 12px", borderRadius: "8px",
                      border: "1.5px solid #e5e7eb", fontSize: "14px",
                      outline: "none", resize: "vertical", boxSizing: "border-box",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={saveEdit}
                    style={{
                      flex: 1, padding: "10px", borderRadius: "8px",
                      border: "none", cursor: "pointer", fontSize: "13px",
                      fontWeight: "600", backgroundColor: "#14b8a6", color: "white",
                    }}
                  >
                    ✓ Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{
                      flex: 1, padding: "10px", borderRadius: "8px",
                      border: "1px solid #e5e7eb", cursor: "pointer",
                      fontSize: "13px", fontWeight: "600",
                      backgroundColor: "white", color: "#374151",
                    }}
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ✅ View mode */
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "2rem" }}>{service.emoji}</span>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "15px", color: "#111827" }}>
                        {service.title}
                      </div>
                      <span style={{
                        fontSize: "11px", fontWeight: "600",
                        backgroundColor: service.isActive ? "#dcfce7" : "#fee2e2",
                        color: service.isActive ? "#059669" : "#dc2626",
                        padding: "2px 8px", borderRadius: "999px",
                      }}>
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.6", marginBottom: "12px" }}>
                  {service.description}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "800", color: "#0d9488" }}>
                    {service.price}
                  </span>
                  <span style={{ fontSize: "13px", color: "#9ca3af" }}>
                    {service.duration}
                  </span>
                </div>

                {/* ✅ Action buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => startEdit(service)}
                    style={{
                      flex: 1, padding: "8px", borderRadius: "8px",
                      border: "1px solid #e5e7eb", cursor: "pointer",
                      fontSize: "12px", fontWeight: "600",
                      backgroundColor: "white", color: "#374151",
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => toggleActive(service.id)}
                    style={{
                      flex: 1, padding: "8px", borderRadius: "8px",
                      border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600",
                      backgroundColor: service.isActive ? "#fee2e2" : "#dcfce7",
                      color: service.isActive ? "#dc2626" : "#059669",
                    }}
                  >
                    {service.isActive ? "⏸ Disable" : "▶ Enable"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}