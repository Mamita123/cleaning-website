import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function ContactInfo() {
  const { t } = useLanguage();

  const areas = [
    "Helsinki Centre", "Espoo", "Vantaa", "Kallio",
    "Töölö", "Kamppi", "Pasila", "Mellunkylä",
  ];

  return (
    <section style={{
      backgroundColor: "var(--bg-secondary)",
      padding: "72px 24px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "800",
            color: "var(--text-heading)",
            marginBottom: "12px",
          }}>
            {t.findUs}
          </h2>
          <p style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: "1.7",
          }}>
            {t.findDesc}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
          marginBottom: "48px",
        }}>

          {/* ✅ Map */}
          <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            minHeight: "300px",
            border: "1px solid var(--border-color)",
          }}>
            <iframe
              title="J & S Palvelut Oy location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.5!2d25.1082!3d60.2252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDEzJzMwLjciTiAyNcKwMDYnMjkuNSJF!5e0!3m2!1sen!2sfi!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          {/* ✅ Service areas */}
          <div>
            <h3 style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "var(--text-heading)",
              marginBottom: "20px",
            }}>
              {t.areasServed}
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
              marginBottom: "24px",
            }}>
              {areas.map((area) => (
                <div key={area} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "var(--text-primary)",
                  fontWeight: "500",
                }}>
                  <span style={{ color: "#14b8a6", fontWeight: "800" }}>{"✓"}</span>
                  {area}
                </div>
              ))}
            </div>

            <p style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
            }}>
              {t.areaDesc}
            </p>

            <a href="/booking" style={{
              display: "inline-block",
              marginTop: "20px",
              backgroundColor: "#14b8a6",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 28px",
              borderRadius: "12px",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            }}>
              {"📅"} {t.bookNow}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}