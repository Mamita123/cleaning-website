import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Popup() {
  const [show, setShow] = useState(false);
  const { language } = useApp();

  useEffect(() => {
  const shown = localStorage.getItem("popupShown");
  if (!shown) {
    const timer = setTimeout(() => {
      setShow(true);
      localStorage.setItem("popupShown", "true");
    }, 3000);
    return () => clearTimeout(timer);
  }
}, []);

  if (!show) return null;

  return (
    <>
      {/* Dark overlay */}
      <div
        onClick={() => setShow(false)}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 99998,
        }}
      />

      {/* Popup */}
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#134e4a",
        borderRadius: "20px",
        padding: "48px 40px",
        maxWidth: "520px",
        width: "90%",
        zIndex: 99999,
        boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        textAlign: "center",
      }}>

        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            border: "2px solid rgba(255,255,255,0.3)",
            backgroundColor: "transparent",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {"✕"}
        </button>

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "rgba(20,184,166,0.2)",
          border: "1px solid rgba(20,184,166,0.4)",
          color: "#5eead4",
          padding: "6px 16px",
          borderRadius: "999px",
          fontSize: "13px",
          fontWeight: "600",
          marginBottom: "24px",
        }}>
          {"🟢 "}{language === "fi" ? "Auki 24/7" : "Open 24/7"}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: "900",
          color: "white",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          lineHeight: "1.2",
          marginBottom: "20px",
        }}>
          {language === "fi"
            ? "TARVITSETKO AMMATTIMAISTA SIIVOUSTA?"
            : "LOOKING FOR PROFESSIONAL CLEANING?"
          }
        </h2>

        {/* Description */}
        <p style={{
          fontSize: "15px",
          color: "#99f6e0",
          lineHeight: "1.7",
          marginBottom: "32px",
        }}>
          {language === "fi"
            ? "J & S Palvelut tarjoaa ammattimaisia siivouspalveluja koteihin ja toimistoihin Helsingissa. Varaa tanaan ja pidamme tilasi puhtaana!"
            : "J & S Palvelut delivers professional eco-friendly cleaning services for homes and offices in Helsinki. Book today and let us keep your space spotless!"
          }
        </p>

        {/* Buttons */}
        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <a
            href="/booking"
            onClick={() => {setShow(false);
            sessionStorage.setItem("popupShown", "true"); 
            }}
            style={{
              backgroundColor: "#14b8a6",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 28px",
              borderRadius: "12px",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(20,184,166,0.4)",
            }}
          >
            {"📅 "}{language === "fi" ? "Varaa nyt" : "Book Now"}
          </a>
          <a
            href="/contact"
            onClick={() => {
    setShow(false);
    sessionStorage.setItem("popupShown", "true");
  }}
            style={{
              backgroundColor: "transparent",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 28px",
              borderRadius: "12px",
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.4)",
            }}
          >
            {language === "fi" ? "Ota yhteytta" : "Contact Us"}
          </a>
        </div>

        {/* Bottom note */}
        <p style={{
          fontSize: "12px",
          color: "#5eead4",
          marginTop: "20px",
          margin: "20px 0 0",
        }}>
          {"📍 "}{language === "fi"
            ? "Palvelemme Helsingissa, Vantaalla ja Espoossa"
            : "Serving Helsinki, Vantaa and Espoo"
          }
        </p>

      </div>
    </>
  );
}
