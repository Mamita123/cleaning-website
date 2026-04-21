import React, { useState, useEffect } from "react";

// ✅ Star rating display
function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{
          fontSize: "14px",
          color: s <= rating ? "#f59e0b" : "#d1d5db",
        }}>★</span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews,  setReviews]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("all");

  // ✅ Fetch all reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        // ✅ Use admin route to get ALL reviews including unapproved
        const token    = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:5000/api/reviews/all", {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) setReviews(data.data);
      } catch {
        console.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // ✅ Approve review
  const approveReview = async (id) => {
    try {
      const token    = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/reviews/${id}/approve`,
        {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        setReviews(prev =>
          prev.map(r => r.id === id ? { ...r, is_approved: true } : r)
        );
      }
    } catch {
      alert("Failed to approve review");
    }
  };

  // ✅ Filter reviews
  const filtered = reviews.filter(r => {
    if (filter === "approved")   return r.is_approved;
    if (filter === "pending")    return !r.is_approved;
    return true;
  });

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
          ⭐ Reviews
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Approve customer reviews before they appear on the website
        </p>
      </div>

      {/* ✅ Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "12px",
        marginBottom: "24px",
      }}>
        {[
          { label: "Total",    value: reviews.length,                          color: "#f0fdf9" },
          { label: "Approved", value: reviews.filter(r => r.is_approved).length,  color: "#dcfce7" },
          { label: "Pending",  value: reviews.filter(r => !r.is_approved).length, color: "#fef3c7" },
          { label: "Avg Rating", value: reviews.length > 0
              ? (reviews.reduce((a,r) => a + r.rating, 0) / reviews.length).toFixed(1)
              : "—",
            color: "#ede9fe" },
        ].map(stat => (
          <div key={stat.label} style={{
            backgroundColor: stat.color,
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#134e4a" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Filter tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {["all", "pending", "approved"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 20px",
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

      {/* ✅ Reviews list */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
          ⏳ Loading reviews...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>⭐</div>
          <div style={{ fontWeight: "600" }}>No reviews yet</div>
          <div style={{ fontSize: "14px", marginTop: "6px" }}>
            Reviews will appear here after customers submit them
          </div>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}>
          {filtered.map(review => (
            <div key={review.id} style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: `1px solid ${review.is_approved ? "#f3f4f6" : "#fef3c7"}`,
            }}>
              {/* ✅ Review header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px",
              }}>
                <div>
                  <div style={{ fontWeight: "700", color: "#111827", fontSize: "15px" }}>
                    {review.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {review.email}
                  </div>
                </div>
                <span style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  backgroundColor: review.is_approved ? "#dcfce7" : "#fef3c7",
                  color: review.is_approved ? "#059669" : "#d97706",
                }}>
                  {review.is_approved ? "✓ Approved" : "⏳ Pending"}
                </span>
              </div>

              <Stars rating={review.rating} />

              <p style={{
                fontSize: "13px",
                color: "#4b5563",
                lineHeight: "1.6",
                margin: "10px 0",
              }}>
                "{review.review}"
              </p>

              <div style={{
                fontSize: "12px",
                color: "#0d9488",
                fontWeight: "600",
                marginBottom: "12px",
              }}>
                🧹 {review.service}
              </div>

              {/* ✅ Approve button — only for pending reviews */}
              {!review.is_approved && (
                <button
                  onClick={() => approveReview(review.id)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    backgroundColor: "#14b8a6",
                    color: "white",
                  }}
                >
                  ✓ Approve Review
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}