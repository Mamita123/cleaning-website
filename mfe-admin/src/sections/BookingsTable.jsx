
import React, { useState, useEffect } from "react";

// ✅ Sample bookings data — will come from MongoDB later
const sampleBookings = [
  {
    id: "BK001",
    customer: "Sarah M.",
    service: "Regular Home Cleaning",
    date: "28 Mar 2026",
    time: "10:00 AM",
    address: "Mannerheimintie 12, Helsinki",
    status: "confirmed",
    amount: "€49",
  },
  {
    id: "BK002",
    customer: "James K.",
    service: "Deep Cleaning",
    date: "29 Mar 2026",
    time: "09:00 AM",
    address: "Aleksanterinkatu 5, Helsinki",
    status: "pending",
    amount: "€99",
  },
  {
    id: "BK003",
    customer: "Lisa T.",
    service: "Office Cleaning",
    date: "30 Mar 2026",
    time: "08:00 AM",
    address: "Ruoholahdenkatu 8, Helsinki",
    status: "confirmed",
    amount: "€79",
  },
  {
    id: "BK004",
    customer: "Tom R.",
    service: "Move Out Cleaning",
    date: "31 Mar 2026",
    time: "11:00 AM",
    address: "Hämeentie 23, Helsinki",
    status: "pending",
    amount: "€129",
  },
  {
    id: "BK005",
    customer: "Anna P.",
    service: "Eco-Friendly Cleaning",
    date: "01 Apr 2026",
    time: "13:00 PM",
    address: "Fleminginkatu 9, Helsinki",
    status: "completed",
    amount: "€59",
  },
];



// ✅ Status badge colors
const statusColors = {
  confirmed: { bg: "#dcfce7", color: "#059669" },
  pending:   { bg: "#fef3c7", color: "#d97706" },
  completed: { bg: "#e0f2fe", color: "#2563eb" },
  cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

export default function BookingsTable() {
  // ✅ State for bookings data
  const [bookings, setBookings] = useState([]);
  const [filter,   setFilter]   = useState("all");
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  // ✅ Fetch real bookings from backend when component loads
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      // ✅ Get JWT token from localStorage
      const token = localStorage.getItem("adminToken");

      const response = await fetch("http://localhost:5000/api/bookings", {
        headers: {
          // ✅ Send token in Authorization header
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setBookings(data.data);
      } else {
        setError("Failed to load bookings");
      }

    } catch (err) {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update booking status in database
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

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
        // ✅ Update local state to reflect change
        setBookings(prev =>
          prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
      }

    } catch (err) {
      alert("Failed to update booking status");
    }
  };

  // ✅ Filter bookings by status
  const filtered = filter === "all"
    ? bookings
    : bookings.filter(b => b.status === filter);

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    }}>

      {/* ✅ Table header */}
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
          color: "#134e4a",
        }}>
          Recent Bookings
        </h3>

        {/* ✅ Refresh button */}
        <button
          onClick={fetchBookings}
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            backgroundColor: "white",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* ✅ Filter tabs */}
      <div style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "20px",
      }}>
        {["all", "confirmed", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "12px",
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

      {/* ✅ Loading state */}
      {loading && (
        <div style={{
          textAlign: "center",
          padding: "40px",
          color: "#6b7280",
        }}>
          ⏳ Loading bookings...
        </div>
      )}

      {/* ✅ Error state */}
      {error && (
        <div style={{
          textAlign: "center",
          padding: "20px",
          color: "#dc2626",
          backgroundColor: "#fef2f2",
          borderRadius: "10px",
          marginBottom: "16px",
        }}>
          ❌ {error}
        </div>
      )}

      {/* ✅ Empty state */}
      {!loading && !error && bookings.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "48px",
          color: "#6b7280",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📅</div>
          <div style={{ fontWeight: "600", fontSize: "16px" }}>
            No bookings yet
          </div>
          <div style={{ fontSize: "14px", marginTop: "6px" }}>
            Bookings will appear here when customers book a cleaning
          </div>
        </div>
      )}

      {/* ✅ Bookings table */}
      {!loading && filtered.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
                {["ID", "Customer", "Service", "Date", "Status", "Amount", "Actions"].map(h => (
                  <th key={h} style={{
                    padding: "10px 12px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking, index) => (
                <tr
                  key={booking.id}
                  style={{
                    borderBottom: "1px solid #f9fafb",
                    backgroundColor: index % 2 === 0 ? "white" : "#fafafa",
                  }}
                >
                  {/* ID */}
                  <td style={{
                    padding: "14px 12px",
                    fontWeight: "700",
                    color: "#0d9488",
                  }}>
                    #{booking.id}
                  </td>

                  {/* Customer */}
                  <td style={{ padding: "14px 12px" }}>
                    <div style={{ fontWeight: "600", color: "#111827" }}>
                      {booking.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      {booking.email}
                    </div>
                  </td>

                  {/* Service */}
                  <td style={{ padding: "14px 12px", color: "#4b5563" }}>
                    {booking.service}
                  </td>

                  {/* Date */}
                  <td style={{
                    padding: "14px 12px",
                    color: "#4b5563",
                    whiteSpace: "nowrap",
                  }}>
                    {booking.date} at {booking.time}
                  </td>

                  {/* Status badge */}
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

                  {/* Amount */}
                  <td style={{
                    padding: "14px 12px",
                    fontWeight: "700",
                    color: "#059669",
                  }}>
                    {booking.amount}
                  </td>

                  {/* Action buttons */}
                  <td style={{ padding: "14px 12px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {booking.status === "pending" && (
                        <button
                          onClick={() => updateStatus(booking.id, "confirmed")}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "11px",
                            fontWeight: "600",
                            backgroundColor: "#dcfce7",
                            color: "#059669",
                          }}
                        >
                          ✓ Confirm
                        </button>
                      )}
                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => updateStatus(booking.id, "completed")}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "11px",
                            fontWeight: "600",
                            backgroundColor: "#e0f2fe",
                            color: "#2563eb",
                          }}
                        >
                          ✓ Complete
                        </button>
                      )}
                      <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: "600",
                          backgroundColor: "#fee2e2",
                          color: "#dc2626",
                        }}
                      >
                        ✕ Cancel
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
  );
}