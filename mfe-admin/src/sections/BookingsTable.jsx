import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import API_URL from "../config";

export default function BookingsTable() {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token    = localStorage.getItem("adminToken");
        const response = await fetch(`${API_URL}/api/bookings`,  {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) setBookings(data.data);
      } catch {
        console.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filterTabs = [
    { key: "all",       label: t.all },
    { key: "confirmed", label: t.confirmed },
    { key: "pending",   label: t.pending },
    { key: "completed", label: t.completed },
  ];

  const filtered = filter === "all"
    ? bookings.slice(0, 5)
    : bookings.filter(b => b.status === filter).slice(0, 5);

  const statusColors = {
    confirmed: { bg: "#dcfce7", color: "#059669" },
    pending:   { bg: "#fef3c7", color: "#d97706" },
    completed: { bg: "#e0f2fe", color: "#2563eb" },
    cancelled: { bg: "#fee2e2", color: "#dc2626" },
  };

  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      border: "1px solid var(--border-color)",
    }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "800",
          color: "var(--text-heading)",
          margin: 0,
        }}>
          {t.recentBookings}
        </h3>

        <button
          onClick={() => window.location.reload()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-primary)",
          }}
        >
          {t.refresh}
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}>
        {filterTabs.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              backgroundColor: filter === f.key ? "#14b8a6" : "var(--bg-primary)",
              color: filter === f.key ? "white" : "var(--text-secondary)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{
          textAlign: "center",
          padding: "32px",
          color: "var(--text-secondary)",
        }}>
          {t.loading}
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "32px",
          color: "var(--text-secondary)",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📅</div>
          <div>{t.noBookings}</div>
        </div>
      )}

      {/* Table */}
      {!loading && filtered.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                {[t.id, t.customer, t.service, t.date, t.status, t.amount, t.actions].map(h => (
                  <th key={h} style={{
                    padding: "8px 10px",
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
                  <td style={{
                    padding: "12px 10px",
                    fontWeight: "700",
                    color: "#0d9488",
                  }}>
                    #{booking.id}
                  </td>

                  <td style={{ padding: "12px 10px" }}>
                    <div style={{
                      fontWeight: "600",
                      color: "var(--text-primary)",
                    }}>
                      {booking.name}
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                    }}>
                      {booking.email}
                    </div>
                  </td>

                  <td style={{
                    padding: "12px 10px",
                    color: "var(--text-secondary)",
                  }}>
                    {booking.service}
                  </td>

                  <td style={{
                    padding: "12px 10px",
                    color: "var(--text-secondary)",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                  }}>
                    {booking.date}
                  </td>

                  <td style={{ padding: "12px 10px" }}>
                    <span style={{
                      backgroundColor: statusColors[booking.status]?.bg,
                      color: statusColors[booking.status]?.color,
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "3px 8px",
                      borderRadius: "999px",
                    }}>
                      {booking.status === "pending"   ? t.pending   :
                       booking.status === "confirmed" ? t.confirmed :
                       booking.status === "completed" ? t.completed :
                       booking.status === "cancelled" ? t.cancelled :
                       booking.status}
                    </span>
                  </td>

                  <td style={{
                    padding: "12px 10px",
                    fontWeight: "700",
                    color: "#059669",
                  }}>
                    {booking.amount}
                  </td>

                  <td style={{ padding: "12px 10px" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#0d9488",
                      cursor: "pointer",
                    }}>
                      view
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
