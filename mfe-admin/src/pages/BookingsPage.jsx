import React, { useState, useEffect } from "react";

// ✅ Status badge colors
const statusColors = {
  confirmed: { bg: "#dcfce7", color: "#059669" },
  pending:   { bg: "#fef3c7", color: "#d97706" },
  completed: { bg: "#e0f2fe", color: "#2563eb" },
  cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

// ✅ Service label mapping
const serviceLabels = {
  regular:   "Regular Home Cleaning",
  deep:      "Deep Cleaning",
  office:    "Office Cleaning",
  moveinout: "Move In / Move Out",
  eco:       "Eco-Friendly Cleaning",
  window:    "Window Cleaning",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");

  // ✅ Fetch all bookings from backend
  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token    = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/api/bookings", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) setBookings(data.data);
      else setError("Failed to load bookings");
    } catch {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update booking status
  const updateStatus = async (id, newStatus) => {
    try {
      const token    = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setBookings(prev =>
          prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
      }
    } catch {
      alert("Failed to update status");
    }
  };

  // ✅ Delete booking
  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch {
      alert("Failed to delete booking");
    }
  };

  // ✅ Filter and search bookings
  const filtered = bookings
    .filter(b => filter === "all" || b.status === filter)
    .filter(b =>
      search === "" ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      {/* ✅ Page header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "#134e4a",
            marginBottom: "4px",
          }}>
            📅 Bookings
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Manage all customer bookings
          </p>
        </div>
        <button
          onClick={fetchBookings}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            backgroundColor: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* ✅ Search + filter bar */}
      <div style={{
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}>
        {/* ✅ Search input */}
        <input
          type="text"
          placeholder="Search by name, email or service..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "10px 16px",
            borderRadius: "10px",
            border: "1.5px solid #e5e7eb",
            fontSize: "14px",
            outline: "none",
            fontFamily: "Inter, sans-serif",
          }}
        />

        {/* ✅ Status filter buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["all", "pending", "confirmed", "completed", "cancelled"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                backgroundColor: filter === f ? "#14b8a6" : "#f3f4f6",
                color: filter === f ? "white" : "#4b5563",
                textTransform: "capitalize",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Stats row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "12px",
        marginBottom: "24px",
      }}>
        {[
          { label: "Total",     value: bookings.length,                              color: "#f0fdf9" },
          { label: "Pending",   value: bookings.filter(b => b.status === "pending").length,   color: "#fef3c7" },
          { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length, color: "#dcfce7" },
          { label: "Completed", value: bookings.filter(b => b.status === "completed").length, color: "#e0f2fe" },
        ].map(stat => (
          <div key={stat.label} style={{
            backgroundColor: stat.color,
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "#134e4a" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Bookings table */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
            ⏳ Loading bookings...
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "16px",
          }}>
            ❌ {error}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📅</div>
            <div style={{ fontWeight: "600" }}>No bookings found</div>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
                  {["ID", "Customer", "Service", "Date & Time",
                    "Address", "Status", "Amount", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking, i) => (
                  <tr
                    key={booking.id}
                    style={{
                      borderBottom: "1px solid #f9fafb",
                      backgroundColor: i % 2 === 0 ? "white" : "#fafafa",
                    }}
                  >
                    <td style={{ padding: "14px 12px", fontWeight: "700", color: "#0d9488" }}>
                      #{booking.id}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      <div style={{ fontWeight: "600", color: "#111827" }}>{booking.name}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>{booking.email}</div>
                      {booking.phone && (
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>{booking.phone}</div>
                      )}
                    </td>
                    <td style={{ padding: "14px 12px", color: "#4b5563" }}>
                      {serviceLabels[booking.service] || booking.service}
                    </td>
                    <td style={{ padding: "14px 12px", color: "#4b5563", whiteSpace: "nowrap" }}>
                      <div>{booking.date}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af" }}>{booking.time}</div>
                    </td>
                    <td style={{ padding: "14px 12px", color: "#4b5563", maxWidth: "160px" }}>
                      <div style={{
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {booking.address}
                      </div>
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      <span style={{
                        backgroundColor: statusColors[booking.status]?.bg,
                        color: statusColors[booking.status]?.color,
                        fontSize: "11px",
                        fontWeight: "700",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        textTransform: "capitalize",
                      }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 12px", fontWeight: "700", color: "#059669" }}>
                      {booking.amount}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {booking.status === "pending" && (
                          <button
                            onClick={() => updateStatus(booking.id, "confirmed")}
                            style={{
                              padding: "4px 8px", borderRadius: "6px", border: "none",
                              cursor: "pointer", fontSize: "11px", fontWeight: "600",
                              backgroundColor: "#dcfce7", color: "#059669",
                            }}
                          >
                            ✓ Confirm
                          </button>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => updateStatus(booking.id, "completed")}
                            style={{
                              padding: "4px 8px", borderRadius: "6px", border: "none",
                              cursor: "pointer", fontSize: "11px", fontWeight: "600",
                              backgroundColor: "#e0f2fe", color: "#2563eb",
                            }}
                          >
                            ✓ Done
                          </button>
                        )}
                        {booking.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(booking.id, "cancelled")}
                            style={{
                              padding: "4px 8px", borderRadius: "6px", border: "none",
                              cursor: "pointer", fontSize: "11px", fontWeight: "600",
                              backgroundColor: "#fee2e2", color: "#dc2626",
                            }}
                          >
                            ✕ Cancel
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          style={{
                            padding: "4px 8px", borderRadius: "6px", border: "none",
                            cursor: "pointer", fontSize: "11px", fontWeight: "600",
                            backgroundColor: "#f3f4f6", color: "#6b7280",
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}