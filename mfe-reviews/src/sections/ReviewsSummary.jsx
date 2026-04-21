import React from "react";
import { useLanguage } from "../hooks/useLanguage";

const breakdown = [
  { stars: 5, count: 1840, percentage: 92 },
  { stars: 4, count: 120,  percentage: 6  },
  { stars: 3, count: 28,   percentage: 1.4 },
  { stars: 2, count: 8,    percentage: 0.4 },
  { stars: 1, count: 4,    percentage: 0.2 },
];

export default function ReviewsSummary() {
  const { t } = useLanguage();

  return (
    <section style={{
      backgroundColor: "var(--bg-secondary)",
      padding: "80px 24px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ✅ Two column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "48px",
          alignItems: "center",
          marginBottom: "64px",
        }}>

          {/* ✅ Overall score */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "6rem",
              fontWeight: "800",
              color: "#0d9488",
              lineHeight: "1",
              marginBottom: "12px",
            }}>
              4.9
            </div>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              marginBottom: "12px",
            }}>
              {[1,2,3,4,5].map((s) => (
                <span key={s} style={{ fontSize: "28px", color: "#f59e0b" }}>
                  {"★"}
                </span>
              ))}
            </div>
            <div style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              fontWeight: "500",
            }}>
              {t.verifiedReviews}
            </div>
          </div>

          {/* ✅ Star breakdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {breakdown.map((row) => (
              <div key={row.stars} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                <div style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  minWidth: "50px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}>
                  {row.stars} <span style={{ color: "#f59e0b" }}>{"★"}</span>
                </div>
                <div style={{
                  flex: 1,
                  height: "10px",
                  backgroundColor: "var(--border-color)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${row.percentage}%`,
                    backgroundColor: row.stars >= 4
                      ? "#14b8a6"
                      : "var(--text-secondary)",
                    borderRadius: "999px",
                  }} />
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  minWidth: "40px",
                  textAlign: "right",
                }}>
                  {row.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ CTA banner */}
        <div style={{
          background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
          borderRadius: "24px",
          padding: "48px 32px",
          textAlign: "center",
        }}>
          <h3 style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: "800",
            color: "white",
            marginBottom: "12px",
          }}>
            {t.joinCustomers}
          </h3>
          <p style={{
            fontSize: "16px",
            color: "#99f6e0",
            marginBottom: "28px",
            lineHeight: "1.6",
          }}>
            {t.joinDesc2}
          </p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}>
            <a href="/booking" style={{
              backgroundColor: "white",
              color: "#0d9488",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              {"📅"} {t.bookCleaning}
            </a>
            <a href="/services" style={{
              backgroundColor: "transparent",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.6)",
              display: "inline-block",
            }}>
              {"🔍"} {t.viewServices}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}