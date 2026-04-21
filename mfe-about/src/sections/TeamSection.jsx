import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function TeamSection() {
  const { t } = useLanguage();

  const team = [
    {
      name: "Jamanta Prasad Gurung",
      role: t.ceoRole,
      emoji: "👨‍💼",
      bio: t.ceoBio,
      accent: "#14b8a6",
    },
    {
      name: "Md. Mahmudul Hassan Shapan",
      role: t.deputyRole,
      emoji: "👨‍💼",
      bio: t.deputyBio,
      accent: "#2563eb",
    },
    {
      name: t.teamName3,
      role: t.teamRole3,
      emoji: "🧹",
      bio: t.teamBio3,
      accent: "#059669",
    },
  ];

  return (
    <section style={{
      backgroundColor: "var(--bg-primary)",
      padding: "80px 24px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: "800",
            color: "var(--text-heading)",
            marginBottom: "16px",
          }}>
            {t.meetTeam}
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--text-secondary)",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            {t.teamSubtitle}
          </p>
        </div>

        {/* ✅ Team grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {team.map((member) => (
            <div
              key={member.name}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              {/* ✅ Top banner */}
              <div style={{
                backgroundColor: "var(--bg-primary)",
                padding: "32px 24px 24px",
                textAlign: "center",
                borderBottom: "1px solid var(--border-color)",
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  margin: "0 auto 16px",
                  border: "1px solid var(--border-color)",
                }}>
                  {member.emoji}
                </div>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}>
                  {member.name}
                </h3>
                <span style={{
                  display: "inline-block",
                  backgroundColor: member.accent,
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "3px 12px",
                  borderRadius: "999px",
                }}>
                  {member.role}
                </span>
              </div>

              {/* ✅ Bio */}
              <div style={{ padding: "20px 24px 24px" }}>
                <p style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  margin: 0,
                }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}