import React, { useState, useEffect } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");

  // ✅ Build customer list from bookings data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const token    = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:5000/api/bookings", {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
          // ✅ Group bookings by email to build customer list
          const customerMap = {};
          data.data.forEach(booking => {
            if (!customerMap[booking.email]) {
              customerMap[booking.email] = {
                name:      booking.name,
                email:     booking.email,
                phone:     booking.phone,
                address:   booking.address,
                bookings:  0,
                spent:     0,
                lastDate:  booking.created_at,
              };
            }
            customerMap[booking.email].bookings++;
            // ✅ Add amount to total spent
            const amount = parseFloat(
              (booking.amount || "0").replace("€", "").replace("From ", "")
            );
            if (!isNaN(amount)) {
              customerMap[booking.email].spent += amount;
            }
          });
          setCustomers(Object.values(customerMap));
        }
      } catch {
        console.error("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // ✅ Filter customers by search
  const filtered = customers.filter(c =>
    search === "" ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

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
          👥 Customers
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          All customers who have made bookings
        </p>
      </div>

      {/* ✅ Stats row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
      }}>
        {[
          { label: "Total Customers", value: customers.length,      color: "#f0fdf9", emoji: "👥" },
          { label: "Total Bookings",  value: customers.reduce((a, c) => a + c.bookings, 0), color: "#e0f2fe", emoji: "📅" },
          { label: "Total Revenue",   value: `€${customers.reduce((a, c) => a + c.spent, 0).toFixed(0)}`, color: "#fef3c7", emoji: "💰" },
        ].map(stat => (
          <div key={stat.label} style={{
            backgroundColor: stat.color,
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "1.75rem", marginBottom: "8px" }}>{stat.emoji}</div>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "#134e4a" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Search */}
      <input
        type="text"
        placeholder="Search customers by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1.5px solid #e5e7eb",
          fontSize: "14px",
          outline: "none",
          marginBottom: "20px",
          boxSizing: "border-box",
          fontFamily: "Inter, sans-serif",
        }}
      />

      {/* ✅ Customer cards grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
          ⏳ Loading customers...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>👥</div>
          <div style={{ fontWeight: "600" }}>No customers yet</div>
          <div style={{ fontSize: "14px", marginTop: "6px" }}>
            Customers will appear here after their first booking
          </div>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {filtered.map((customer, i) => (
            <div key={customer.email} style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid #f3f4f6",
            }}>
              {/* ✅ Customer avatar + name */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "16px",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#f0fdf9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#0d9488",
                  flexShrink: 0,
                }}>
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#111827", fontSize: "15px" }}>
                    {customer.name}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    {customer.email}
                  </div>
                </div>
              </div>

              {/* ✅ Customer details */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}>
                {[
                  { label: "Bookings", value: customer.bookings },
                  { label: "Total Spent", value: `€${customer.spent.toFixed(0)}` },
                ].map(item => (
                  <div key={item.label} style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "10px",
                    padding: "10px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "#0d9488" }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "500" }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ Phone and address */}
              {customer.phone && (
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "12px" }}>
                  📞 {customer.phone}
                </div>
              )}
              {customer.address && (
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                  📍 {customer.address}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}