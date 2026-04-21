import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{
          fontSize: "16px",
          color: star <= rating ? "#f59e0b" : "var(--border-color)",
        }}>
          {"★"}
        </span>
      ))}
    </div>
  );
}

export default function ReviewsGrid() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // ✅ Reviews data
  const allReviews = [
    {
      id: 1, name: "Sarah M.", emoji: "👩", rating: 5,
      date: "March 2026", service: t.homeCleaning,
      review: t.review1, verified: true, category: "home",
    },
    {
      id: 2, name: "James K.", emoji: "👨", rating: 5,
      date: "March 2026", service: t.deepCleanFilter,
      review: t.review2, verified: true, category: "deep",
    },
    {
      id: 3, name: "Lisa T.", emoji: "👩‍💼", rating: 5,
      date: "February 2026", service: t.officeFilter2,
      review: t.review3, verified: true, category: "office",
    },
    {
      id: 4, name: "Tom R.", emoji: "👨‍💻", rating: 4,
      date: "February 2026", service: t.homeCleaning,
      review: t.review4, verified: true, category: "home",
    },
    {
      id: 5, name: "Anna P.", emoji: "👩‍🦰", rating: 5,
      date: "January 2026", service: t.deepCleanFilter,
      review: t.review5, verified: true, category: "deep",
    },
    {
      id: 6, name: "Michael B.", emoji: "🧑", rating: 5,
      date: "January 2026", service: t.homeCleaning,
      review: t.review6, verified: true, category: "home",
    },
    {
      id: 7, name: "Emma S.", emoji: "👩‍🦱", rating: 5,
      date: "December 2025", service: t.deepCleanFilter,
      review: t.review7, verified: true, category: "deep",
    },
    {
      id: 8, name: "David L.", emoji: "👨‍🦳", rating: 4,
      date: "December 2025", service: t.officeFilter2,
      review: t.review8, verified: true, category: "office",
    },
    {
      id: 9, name: "Priya N.", emoji: "👩‍🦳", rating: 5,
      date: "November 2025", service: t.homeCleaning,
      review: t.review9, verified: true, category: "home",
    },
  ];

  // ✅ Filter tabs using translations
  const filters = [
    { key: "all",    label: t.allReviews },
    { key: "home",   label: t.homeCleaning },
    { key: "deep",   label: t.deepCleanFilter },
    { key: "office", label: t.officeFilter2 },
  ];

  const filtered = activeFilter === "all"
    ? allReviews
    : allReviews.filter(r => r.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);

  return (
    <section style={{
      backgroundColor: "var(--bg-primary)",
      padding: "72px 24px",
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
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key);
                setVisibleCount(6);
              }}
              style={{
                padding: "10px 24px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
                backgroundColor: activeFilter === filter.key
                  ? "#14b8a6" : "var(--bg-card)",
                color: activeFilter === filter.key
                  ? "white" : "var(--text-secondary)",
                boxShadow: activeFilter === filter.key
                  ? "0 2px 8px rgba(20,184,166,0.35)"
                  : "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* ✅ Reviews grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "48px",
        }}>
          {visible.map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              {/* ✅ Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    flexShrink: 0,
                    border: "1px solid var(--border-color)",
                  }}>
                    {review.emoji}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: "700",
                      fontSize: "15px",
                      color: "var(--text-primary)",
                    }}>
                      {review.name}
                    </div>
                    {review.verified && (
                      <div style={{
                        fontSize: "11px",
                        color: "#0d9488",
                        fontWeight: "600",
                      }}>
                        {"✓"} {t.verifiedCustomer}
                      </div>
                    )}
                  </div>
                </div>
                <span style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                }}>
                  {review.date}
                </span>
              </div>

              {/* ✅ Stars */}
              <StarRating rating={review.rating} />

              {/* ✅ Review text */}
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: "1.7",
                margin: 0,
                flex: 1,
              }}>
                {'"'}{review.review}{'"'}
              </p>

              {/* ✅ Service tag */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "var(--bg-primary)",
                color: "#0f766e",
                fontSize: "12px",
                fontWeight: "600",
                padding: "4px 12px",
                borderRadius: "999px",
                alignSelf: "flex-start",
                border: "1px solid var(--border-color)",
              }}>
                🧹 {review.service}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Load More */}
        {visibleCount < filtered.length && (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              style={{
                backgroundColor: "var(--bg-card)",
                color: "#0d9488",
                fontSize: "15px",
                fontWeight: "600",
                padding: "14px 36px",
                borderRadius: "12px",
                border: "2px solid #14b8a6",
                cursor: "pointer",
              }}
            >
              {t.loadMore}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}