import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import API_URL from "../config";

const statusColors = {
  confirmed: { bg: "#dcfce7", color: "#059669" },
  pending:   { bg: "#fef3c7", color: "#d97706" },
  completed: { bg: "#e0f2fe", color: "#2563eb" },
  cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

const serviceLabels = {
  regular:   "Regular Home Cleaning",
  deep:      "Deep Cleaning",
  office:    "Office Cleaning",
  moveinout: "Move In / Move Out",
  eco:       "Eco-Friendly Cleaning",
  window:    "Window Cleaning",
};

const serviceLabelsfi = {
  regular:   "Kotisiivous",
  deep:      "Syvasiivous",
  office:    "Toimistosiivous",
  moveinout: "Muuttosaately",
  eco:       "Ymparistoystavallinen",
  window:    "Ikkunanpesu",
};

export default function BookingsPage() {
  const { t, language } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");

  // ✅ Use correct service labels based on language
  const labels = language === "fi" ? serviceLabelsfi : serviceLabels;

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token    = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/bookings/${id}/status`,{
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) setBookings(data.data);
      else setError(t.failedLoad);
    } catch {
      setError(t.cannotConnect);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token    = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/bookings/${id}`, 
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
      alert(t.cannotConnect);
    }
  };

  const deleteBooking = async (id) => {
    const confirmMsg = language === "fi"
      ? "Haluatko varmasti poistaa taman varauksen?"
      : "Are you sure you want to delete this booking?";
    if (!window.confirm(confirmMsg)) return;
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`${API_URL}/api/bookings`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch {
      alert(t.cannotConnect);
    }
  };

  // ✅ Filter tabs
  const filterTabs = [
    { key: "all",       label: t.all },
    { key: "pending",   label: t.pending },
    { key: "confirmed", label: t.confirmed },
    { key: "completed", label: t.completed },
    { key: "cancelled", label: t.cancelled },
  ];

  // ✅ Stats
  const statsData = [
    { label: t.total,     value: bookings.length,                                        color: "#f0fdf9" },
    { label: t.pending,   value: bookings.filter(b => b.status === "pending").length,    color: "#fef3c7" },
    { label: t.confirmed, value: bookings.filter(b => b.status === "confirmed").length,  color: "#dcfce7" },
    { label: t.completed, value: bookings.filter(b => b.status === "completed").length,  color: "#e0f2fe" },
  ];

  // ✅ Filter and search
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
            color: "var(--text-heading)",
            marginBottom: "4px",
          }}>
            {"📅"} {t.bookingsTitle}
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            {t.bookingsDesc}
          </p>
        </div>
        <button
          onClick={fetchBookings}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-card)",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            color: "var(--text-primary)",
          }}
        >
          {"🔄"} {t.refresh}
        </button>
      </div>

      {/* ✅ Search + filter */}
      <div style={{
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}>
        <input
          type="text"
          placeholder={t.searchBookings}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "10px 16px",
            borderRadius: "10px",
            border: "1.5px solid var(--border-color)",
            fontSize: "14px",
            outline: "none",
            fontFamily: "Inter, sans-serif",
            backgroundColor: "var(--bg-card)",
            color: "var(--text-primary)",
          }}
        />

        {/* ✅ Filter tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {filterTabs.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                backgroundColor: filter === f.key ? "#14b8a6" : "var(--bg-card)",
                color: filter === f.key ? "white" : "var(--text-secondary)",
              }}
            >
              {f.label}
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
        {statsData.map(stat => (
          <div key={stat.label} style={{
            backgroundColor: stat.color,
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#134e4a",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: "13px",
              color: "#6b7280",
              fontWeight: "500",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Bookings table */}
      <div style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "1px solid var(--border-color)",
      }}>

        {/* ✅ Loading */}
        {loading && (
          <div style={{
            textAlign: "center",
            padding: "48px",
            color: "var(--text-secondary)",
          }}>
            {"⏳"} {t.loading}
          </div>
        )}

        {/* ✅ Error */}
        {error && (
          <div style={{
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "16px",
          }}>
            {"❌"} {error}
          </div>
        )}

        {/* ✅ Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "48px",
            color: "var(--text-secondary)",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📅</div>
            <div style={{ fontWeight: "600" }}>{t.noBookings}</div>
          </div>
        )}

        {/* ✅ Table */}
        {!loading && filtered.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                  {[t.id, t.customer, t.service, t.dateTime,
                    t.address, t.status, t.amount, t.actions].map(h => (
                    <th key={h} style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "var(--text-secondary)",
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
                      borderBottom: "1px solid var(--border-color)",
                      backgroundColor: i % 2 === 0
                        ? "var(--bg-card)"
                        : "var(--bg-primary)",
                    }}
                  >
                    {/* ✅ ID */}
                    <td style={{
                      padding: "14px 12px",
                      fontWeight: "700",
                      color: "#0d9488",
                    }}>
                      {"#"}{booking.id}
                    </td>

                    {/* ✅ Customer */}
                    <td style={{ padding: "14px 12px" }}>
                      <div style={{
                        fontWeight: "600",
                        color: "var(--text-primary)",
                      }}>
                        {booking.name}
                      </div>
                      <div style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}>
                        {booking.email}
                      </div>
                      {booking.phone && (
                        <div style={{
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}>
                          {booking.phone}
                        </div>
                      )}
                    </td>

                    {/* ✅ Service — translated */}
                    <td style={{
                      padding: "14px 12px",
                      color: "var(--text-secondary)",
                    }}>
                      {labels[booking.service] || booking.service}
                    </td>

                    {/* ✅ Date & Time */}
                    <td style={{
                      padding: "14px 12px",
                      color: "var(--text-secondary)",
                      whiteSpace: "nowrap",
                    }}>
                      <div>{booking.date}</div>
                      <div style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}>
                        {booking.time}
                      </div>
                    </td>

                    {/* ✅ Address */}
                    <td style={{
                      padding: "14px 12px",
                      color: "var(--text-secondary)",
                      maxWidth: "160px",
                    }}>
                      <div style={{
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {booking.address}
                      </div>
                    </td>

                    {/* ✅ Status */}
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
                        {booking.status === "pending"   ? t.pending   :
                         booking.status === "confirmed" ? t.confirmed :
                         booking.status === "completed" ? t.completed :
                         booking.status === "cancelled" ? t.cancelled :
                         booking.status}
                      </span>
                    </td>

                    {/* ✅ Amount */}
                    <td style={{
                      padding: "14px 12px",
                      fontWeight: "700",
                      color: "#059669",
                    }}>
                      {booking.amount}
                    </td>

                    {/* ✅ Actions */}
                    <td style={{ padding: "14px 12px" }}>
                      <div style={{
                        display: "flex",
                        gap: "4px",
                        flexWrap: "wrap",
                      }}>
                        {booking.status === "pending" && (
                          <button
                            onClick={() => updateStatus(booking.id, "confirmed")}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "11px",
                              fontWeight: "600",
                              backgroundColor: "#dcfce7",
                              color: "#059669",
                            }}
                          >
                            {"✓"} {t.confirm}
                          </button>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => updateStatus(booking.id, "completed")}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "11px",
                              fontWeight: "600",
                              backgroundColor: "#e0f2fe",
                              color: "#2563eb",
                            }}
                          >
                            {"✓"} {t.done}
                          </button>
                        )}
                        {booking.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(booking.id, "cancelled")}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "11px",
                              fontWeight: "600",
                              backgroundColor: "#fee2e2",
                              color: "#dc2626",
                            }}
                          >
                            {"✕"} {t.cancel}
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "11px",
                            fontWeight: "600",
                            backgroundColor: "var(--bg-primary)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {"🗑"}
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