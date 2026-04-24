import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function BookingConfirm({ booking, onReset }) {
  const { t, language } = useLanguage();

  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      backgroundColor: "var(--bg-primary)",
    }}>
      <div style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "24px",
        padding: "48px 40px",
        maxWidth: "560px",
        width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        border: "1px solid var(--border-color)",
      }}>

        {/* ✅ Success icon */}
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#f0fdf9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          margin: "0 auto 24px",
          border: "3px solid #99f6e0",
        }}>
          {"✅"}
        </div>

        {/* ✅ Title */}
        <h2 style={{
          fontSize: "24px",
          fontWeight: "800",
          color: "var(--text-heading)",
          marginBottom: "12px",
          textAlign: "center",
        }}>
          {t.bookingConfirmed}
        </h2>

        <p style={{
          fontSize: "15px",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "28px",
          textAlign: "center",
        }}>
          {t.bookingThankYou}{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            {booking.email}
          </strong>
        </p>

        {/* ✅ Booking summary */}
        <div style={{
          backgroundColor: "var(--bg-primary)",
          borderRadius: "16px",
          padding: "20px 24px",
          marginBottom: "24px",
          border: "1px solid var(--border-color)",
        }}>
          {[
            { label: t.service, value: booking.service },
            { label: t.date,    value: booking.date },
            { label: t.time,    value: booking.time },
            { label: t.address, value: booking.address },
          ].map((item) => (
            <div key={item.label} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid var(--border-color)",
              fontSize: "14px",
              flexWrap: "wrap",
              gap: "8px",
            }}>
              <span style={{
                color: "var(--text-secondary)",
                fontWeight: "500",
              }}>
                {item.label}
              </span>
              <span style={{
                color: "var(--text-primary)",
                fontWeight: "600",
                textAlign: "right",
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Payment methods */}
        <div style={{
          backgroundColor: "var(--bg-primary)",
          borderRadius: "16px",
          padding: "20px 24px",
          marginBottom: "24px",
          border: "1px solid var(--border-color)",
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text-heading)",
            marginBottom: "16px",
          }}>
            {language === "fi" ? "💳 Maksutavat" : "💳 Payment Methods"}
          </h3>

          {/* ✅ Cash */}
          <div style={{
            display: "flex",
            gap: "14px",
            alignItems: "flex-start",
            padding: "12px 0",
            borderBottom: "1px solid var(--border-color)",
          }}>
            <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>💵</span>
            <div>
              <div style={{
                fontWeight: "700",
                fontSize: "14px",
                color: "var(--text-primary)",
                marginBottom: "2px",
              }}>
                {language === "fi" ? "Käteinen" : "Cash"}
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: "1.5",
              }}>
                {language === "fi"
                  ? "Maksa käteisellä siivouspäivänä siivoojalle."
                  : "Pay cash to the cleaner on the day of service."
                }
              </div>
            </div>
          </div>

          {/* ✅ Bank Transfer */}
          <div style={{
            display: "flex",
            gap: "14px",
            alignItems: "flex-start",
            padding: "12px 0",
            borderBottom: "1px solid var(--border-color)",
          }}>
            <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>🏦</span>
            <div>
              <div style={{
                fontWeight: "700",
                fontSize: "14px",
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}>
                {language === "fi" ? "Pankkisiirto" : "Bank Transfer"}
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
              }}>
                {language === "fi" ? "Saaja: " : "Recipient: "}
                <strong style={{ color: "var(--text-primary)" }}>
                  J & S Palvelut Oy
                </strong>
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
              }}>
                IBAN:{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  FI12 3456 7890 1234 56
                </strong>
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
              }}>
                {language === "fi" ? "Viite: " : "Reference: "}
                <strong style={{ color: "var(--text-primary)" }}>
                  {booking.name} -{" "}
                  {language === "fi" ? "Varaus" : "Booking"}
                </strong>
              </div>
            </div>
          </div>

          {/* ✅ MobilePay */}
          <div style={{
            display: "flex",
            gap: "14px",
            alignItems: "flex-start",
            padding: "12px 0",
          }}>
            <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>📱</span>
            <div>
              <div style={{
                fontWeight: "700",
                fontSize: "14px",
                color: "var(--text-primary)",
                marginBottom: "2px",
              }}>
                MobilePay
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: "1.5",
              }}>
                {language === "fi" ? "Numero: " : "Number: "}
                <strong style={{ color: "var(--text-primary)" }}>
                  045 181 2636
                </strong>
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: "1.5",
              }}>
                {language === "fi"
                  ? "Laheta maksu MobilePaylla ennen siivousta."
                  : "Send payment via MobilePay before the cleaning."
                }
              </div>
            </div>
          </div>
        </div>

        {/* ✅ VAT + Kotitalousvahennys info */}
        <div style={{
          backgroundColor: "#f0fdf9",
          borderRadius: "12px",
          padding: "14px 18px",
          marginBottom: "24px",
          border: "1px solid #99f6e0",
          fontSize: "13px",
          color: "#0f766e",
          lineHeight: "1.6",
          textAlign: "center",
        }}>
          <div style={{ fontWeight: "700", marginBottom: "4px" }}>
            {language === "fi"
              ? "💡 Kotitalousvahennys saatavilla!"
              : "💡 Kotitalousvahennys available!"
            }
          </div>
          <div>
            {language === "fi"
              ? "Saata jopa 40% verovahennys siivouspalveluista. Kysy meilta lisatietoja!"
              : "Get up to 40% tax deduction on cleaning services. Ask us for more details!"
            }
          </div>
        </div>

        {/* ✅ Contact info */}
        <div style={{
          backgroundColor: "var(--bg-primary)",
          borderRadius: "12px",
          padding: "14px 18px",
          marginBottom: "24px",
          border: "1px solid var(--border-color)",
          fontSize: "13px",
          color: "var(--text-secondary)",
          textAlign: "center",
          lineHeight: "1.8",
        }}>
          <div style={{ fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>
            {language === "fi" ? "📞 Kysymyksia?" : "📞 Questions?"}
          </div>
          <div>
            {language === "fi" ? "Soita: " : "Call: "}
            <strong style={{ color: "#0d9488" }}>045 181 2636</strong>
          </div>
          <div>
            {language === "fi" ? "Sahkoposti: " : "Email: "}
            <strong style={{ color: "#0d9488" }}>mahmudul.shapan7@gmail.com</strong>
          </div>
        </div>

        {/* ✅ Book another */}
        <button
          onClick={onReset}
          style={{
            backgroundColor: "#14b8a6",
            color: "white",
            fontSize: "15px",
            fontWeight: "700",
            padding: "14px 32px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            width: "100%",
          }}
        >
          {"📅"} {t.bookAnother}
        </button>

      </div>
    </div>
  );
}