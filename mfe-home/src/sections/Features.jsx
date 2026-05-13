import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      number: "1",
      image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80",
      title: t.ecoTitle,
      description: t.ecoDesc,
      color: "#0d9488",
    },
    {
      number: "2",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80",
      title: t.flexTitle,
      description: t.flexDesc,
      color: "#2563eb",
    },
    {
      number: "3",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80",
      title: t.vettedTitle,
      description: t.vettedDesc,
      color: "#7c3aed",
    },
    {
      number: "4",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
      title: t.transTitle,
      description: t.transDesc,
      color: "#d97706",
    },
    {
      number: "5",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
      title: t.guarTitle,
      description: t.guarDesc,
      color: "#059669",
    },
    {
      number: "6",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
      title: t.easyTitle,
      description: t.easyDesc,
      color: "#0891b2",
    },
  ];

  return (
    <section style={{
      backgroundColor: "var(--bg-secondary)",
      padding: "80px 24px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: "800",
            color: "var(--text-heading)",
            marginBottom: "16px",
          }}>
            {t.whyChooseUs}
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            {t.whySubtitle}
          </p>
        </div>

        {/* Alternating rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {features.map(function(feature, index) {
            var isEven = index % 2 === 1;
            return (
              <div
                key={feature.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "64px",
                  alignItems: "center",
                }}
              >
                {/* Text side */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    color: feature.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "16px",
                  }}>
                    {feature.number + ". " + feature.title.toUpperCase()}
                  </div>
                  <p style={{
                    fontSize: "16px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.9",
                    margin: 0,
                  }}>
                    {feature.description}
                  </p>
                </div>

                {/* Image side */}
                <div style={{
                  order: isEven ? 1 : 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <div style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "280px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "3px solid " + feature.color + "30",
                  }}>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </section>
  );
}
