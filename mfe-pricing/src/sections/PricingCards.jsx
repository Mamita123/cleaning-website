import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function PricingCards() {
  const [isYearly, setIsYearly] = useState(false);
  const { t } = useLanguage();

  // ✅ Dark mode observer
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(
        document.documentElement.getAttribute("data-theme") === "dark"
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // ✅ Plans — all text from translations
  const plans = [
    {
      id:           "basic",
      name:         t.planBasic,
      emoji:        "🌱",
      monthlyPrice: "€49",
      yearlyPrice:  "€39",
      description:  t.planBasicDesc,
      features:     [t.basicF1, t.basicF2, t.basicF3, t.basicF4, t.basicF5, t.basicF6],
      notIncluded:  [t.basicN1, t.basicN2, t.basicN3],
      cta:          t.planBasicCta,
      popular:      false,
    },
    {
      id:           "standard",
      name:         t.planStandard,
      emoji:        "⭐",
      monthlyPrice: "€79",
      yearlyPrice:  "€63",
      description:  t.planStandardDesc,
      features:     [t.stdF1, t.stdF2, t.stdF3, t.stdF4, t.stdF5, t.stdF6],
      notIncluded:  [t.stdN1, t.stdN2],
      cta:          t.planStandardCta,
      popular:      true,
    },
    {
      id:           "premium",
      name:         t.planPremium,
      emoji:        "👑",
      monthlyPrice: "€129",
      yearlyPrice:  "€103",
      description:  t.planPremiumDesc,
      features:     [t.premF1, t.premF2, t.premF3, t.premF4, t.premF5, t.premF6],
      notIncluded:  [],
      cta:          t.planPremiumCta,
      popular:      false,
    },
  ];

  return (
    <section style={{
      padding: "72px 24px",
      backgroundColor: "var(--bg-primary)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ✅ Billing toggle */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "56px",
        }}>
          <span style={{
            fontSize: "15px",
            fontWeight: "600",
            color: !isYearly ? "#0d9488" : "var(--text-secondary)",
          }}>
            {t.monthly}
          </span>

          <button
            onClick={() => setIsYearly(!isYearly)}
            style={{
              width: "52px",
              height: "28px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              backgroundColor: isYearly ? "#14b8a6" : "var(--border-color)",
              position: "relative",
              transition: "background 0.2s",
              padding: 0,
            }}
          >
            <span style={{
              position: "absolute",
              top: "3px",
              left: isYearly ? "27px" : "3px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "white",
              transition: "left 0.2s",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }} />
          </button>

          <span style={{
            fontSize: "15px",
            fontWeight: "600",
            color: isYearly ? "#0d9488" : "var(--text-secondary)",
          }}>
            {t.yearly}
            <span style={{
              marginLeft: "8px",
              backgroundColor: "#ccfbef",
              color: "#0f766e",
              fontSize: "11px",
              fontWeight: "700",
              padding: "2px 8px",
              borderRadius: "999px",
            }}>
              {t.save20}
            </span>
          </span>
        </div>

        {/* ✅ Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                backgroundColor: plan.popular
                  ? isDark ? "#134e4a" : "#0d9488"
                  : "var(--bg-card)",
                borderRadius: "24px",
                border: plan.popular
                  ? "2px solid #14b8a6"
                  : "2px solid var(--border-color)",
                padding: "36px 28px",
                position: "relative",
                transform: plan.popular ? "scale(1.05)" : "scale(1)",
                boxShadow: plan.popular
                  ? "0 20px 60px rgba(13,148,136,0.25)"
                  : "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* ✅ Popular badge */}
              {plan.popular && (
                <div style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#14b8a6",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "700",
                  padding: "4px 20px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                }}>
                  {/* ✅ Star emoji + translated text */}
                  {"⭐"} {t.mostPopular}
                </div>
              )}

              {/* ✅ Emoji */}
              <span style={{ fontSize: "2rem" }}>{plan.emoji}</span>

              {/* ✅ Plan name — from translations */}
              <h3 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: plan.popular
                  ? isDark ? "#5eead4" : "white"
                  : "var(--text-primary)",
                margin: "8px 0 4px",
              }}>
                {plan.name}
              </h3>

              {/* ✅ Description */}
              <p style={{
                fontSize: "14px",
                color: plan.popular
                  ? isDark ? "#99f6e0" : "#ccfbef"
                  : "var(--text-secondary)",
                lineHeight: "1.5",
                marginBottom: "16px",
              }}>
                {plan.description}
              </p>

              {/* ✅ Price */}
              <div style={{ marginBottom: "28px" }}>
                <span style={{
                  fontSize: "48px",
                  fontWeight: "800",
                  color: plan.popular
                    ? isDark ? "#5eead4" : "white"
                    : "#0d9488",
                  lineHeight: "1",
                }}>
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span style={{
                  fontSize: "16px",
                  color: plan.popular
                    ? isDark ? "#99f6e0" : "#ccfbef"
                    : "var(--text-secondary)",
                  marginLeft: "4px",
                }}>
                  {t.perMonth}
                </span>
              </div>

              {/* ✅ Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: plan.popular
                      ? isDark ? "#99f6e0" : "#ccfbef"
                      : "var(--text-primary)",
                    marginBottom: "10px",
                    fontWeight: "500",
                  }}>
                    <span style={{
                      color: plan.popular ? "#5eead4" : "#14b8a6",
                      fontWeight: "800",
                      fontSize: "16px",
                    }}>
                      {"✓"}
                    </span>
                    {feature}
                  </li>
                ))}

                {/* ✅ Not included */}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: plan.popular
                      ? isDark ? "#99f6e0" : "#ccfbef"
                      : "var(--text-secondary)",
                    marginBottom: "10px",
                    textDecoration: "line-through",
                    opacity: 0.6,
                  }}>
                    <span style={{ fontWeight: "800" }}>{"✗"}</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* ✅ CTA button */}
              <a href="/booking" style={{
                display: "block",
                textAlign: "center",
                backgroundColor: plan.popular ? "white" : "#14b8a6",
                color: plan.popular ? "#0d9488" : "white",
                fontSize: "15px",
                fontWeight: "700",
                padding: "14px 24px",
                borderRadius: "12px",
                textDecoration: "none",
              }}>
                {plan.cta}
              </a>

            </div>
          ))}
        </div>

        {/* ✅ Bottom note */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <p style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "16px",
          }}>
            {t.allPlansInclude}
          </p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--bg-card)",
              padding: "10px 20px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-color)",
            }}>
              {"🧾"} {t.vatNotice}
            </div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f0fdf9",
              padding: "10px 20px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#0f766e",
              border: "1.5px solid #99f6e0",
            }}>
              {"💡"} {t.kotivah}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}