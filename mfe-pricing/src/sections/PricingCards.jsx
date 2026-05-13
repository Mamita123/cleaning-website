import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function PricingCards() {
  const { language } = useLanguage();

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

  const services = [
    {
      id:          "home",
      emoji:       "🏠",
      name:        language === "fi" ? "Kotisiivous" : "Home Cleaning",
      description: language === "fi"
        ? "Ammattimainen kodin siivous räätälöitynä tarpeisiisi."
        : "Professional home cleaning tailored to your needs.",
      price:       35,
      features:    language === "fi"
        ? ["Pölynimurointi ja pyyhintä", "Keittiön puhdistus", "Kylpyhuoneen puhdistus", "Lattioiden pesu", "Roskien tyhjennys"]
        : ["Vacuuming and dusting", "Kitchen cleaning", "Bathroom cleaning", "Floor washing", "Trash removal"],
      popular: false,
    },
    {
      id:          "deep",
      emoji:       "✨",
      name:        language === "fi" ? "Syväsiivous" : "Deep Cleaning",
      description: language === "fi"
        ? "Perusteellinen siivous joka nurkkaan ja sopukkaan."
        : "Thorough cleaning reaching every corner and surface.",
      price:       45,
      features:    language === "fi"
        ? ["Kaikki kotisiivouspalvelut", "Ikkunoiden puhdistus", "Kaappien sisäpuolien puhdistus", "Kodinkoneiden puhdistus", "Syvä lattioiden pesu", "Desinfiointi"]
        : ["All home cleaning services", "Window cleaning", "Inside cabinet cleaning", "Appliance cleaning", "Deep floor washing", "Disinfection"],
      popular: true,
    },
    {
      id:          "office",
      emoji:       "🏢",
      name:        language === "fi" ? "Toimistosiivous" : "Office Cleaning",
      description: language === "fi"
        ? "Pidä toimistosi siistinä ja tuottavana."
        : "Keep your office clean and productive.",
      price:       38,
      features:    language === "fi"
        ? ["Työpöytien puhdistus", "Lattioiden imurointi ja pesu", "Keittiö ja taukotila", "WC-tilojen puhdistus", "Roskien tyhjennys", "Ikkunapintojen pyyhintä"]
        : ["Desk and surface cleaning", "Floor vacuuming and washing", "Kitchen and break room", "Toilet cleaning", "Trash removal", "Window surface wiping"],
      popular: false,
    },
    {
      id:          "moveinout",
      emoji:       "📦",
      name:        language === "fi" ? "Muuttosiivous" : "Move In / Move Out",
      description: language === "fi"
        ? "Täydellinen siivous muuton yhteydessä."
        : "Complete cleaning for moving in or out.",
      price:       45,
      features:    language === "fi"
        ? ["Koko asunnon syväsiivous", "Kaappien sisäpuolien pesu", "Kodinkoneiden puhdistus", "Ikkunoiden pesu", "Lattioiden kiillotus", "Desinfiointi"]
        : ["Full apartment deep clean", "Inside cabinet washing", "Appliance deep cleaning", "Window washing", "Floor polishing", "Disinfection"],
      popular: false,
    },
    {
      id:          "window",
      emoji:       "🪟",
      name:        language === "fi" ? "Ikkunanpesu" : "Window Cleaning",
      description: language === "fi"
        ? "Kirkkaat ikkunat sisältä ja ulkoa."
        : "Crystal clear windows inside and outside.",
      price:       35,
      features:    language === "fi"
        ? ["Ikkunoiden pesu sisältä", "Ikkunoiden pesu ulkoa", "Ikkunapuiteiden pyyhintä", "Ikkunalaudojen puhdistus", "Tahrojen poisto"]
        : ["Inside window washing", "Outside window washing", "Window frame wiping", "Window sill cleaning", "Stain removal"],
      popular: false,
    },
    {
      id:          "restaurant",
      emoji:       "🍽️",
      name:        language === "fi" ? "Ravintola ja baari" : "Restaurant & Bar",
      description: language === "fi"
        ? "Ammattimainen siivous ravintoloille ja baareille."
        : "Professional cleaning for restaurants and bars.",
      price:       40,
      features:    language === "fi"
        ? ["Keittiön syväpuhdistus", "Lattioiden pesu ja desinfiointi", "Pöytien ja tuolien puhdistus", "Baaritiskin puhdistus", "WC-tilojen desinfiointi", "Roskien tyhjennys"]
        : ["Kitchen deep cleaning", "Floor washing and disinfection", "Table and chair cleaning", "Bar counter cleaning", "Toilet disinfection", "Trash removal"],
      popular: false,
    },
    {
  id:          "store",
  emoji:       "🏪",
  name:        language === "fi" ? "Myymalasiivous" : "Store Cleaning",
  description: language === "fi"
    ? "Ammattimainen myymalan siivous asiakkaillesi."
    : "Professional store and shop cleaning for your customers.",
  price:       38,
  features:    language === "fi"
    ? ["Lattioiden pesu ja kiillotus", "Hyllyjen puhdistus", "Sisaankaynti ja kassaalue", "Nayteikyyneiden puhdistus", "WC-tilojen puhdistus", "Roskien tyhjennys"]
    : ["Floor washing and polishing", "Shelf and display cleaning", "Entrance and checkout area", "Display case cleaning", "Toilet cleaning", "Trash removal"],
  popular: false,
},
  ];

  return (
    <section style={{
      padding: "72px 24px",
      backgroundColor: "var(--bg-primary)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "800",
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}>
            {language === "fi" ? "Palvelumme ja hinnat" : "Our Services and Pricing"}
          </h2>
          <p style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto 16px",
          }}>
            {language === "fi"
              ? "Kaikki hinnat ovat tuntihintoja ilman ALV:ta (25,5%). "
              : "All prices are per hour excluding VAT (25.5%). "
            }
          </p>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#fef3c7",
            padding: "10px 20px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#92400e",
            border: "1px solid #fde68a",
          }}>
            {"⚠️"} {language === "fi"
              ? "Hinnat ilman ALV 25,5%"
              : "Prices exclude VAT 25.5%"
            }
          </div>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}>
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                backgroundColor: service.popular
                  ? isDark ? "#134e4a" : "#0d9488"
                  : "var(--bg-card)",
                borderRadius: "24px",
                border: service.popular
                  ? "2px solid #14b8a6"
                  : "2px solid var(--border-color)",
                padding: "36px 28px",
                position: "relative",
                transform: service.popular ? "scale(1.03)" : "scale(1)",
                boxShadow: service.popular
                  ? "0 20px 60px rgba(13,148,136,0.25)"
                  : "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Popular badge */}
              {service.popular && (
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
                  {"⭐"} {language === "fi" ? "Suosituin" : "Most Popular"}
                </div>
              )}

              {/* Emoji */}
              <span style={{ fontSize: "2rem" }}>{service.emoji}</span>

              {/* Service name */}
              <h3 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: service.popular
                  ? isDark ? "#5eead4" : "white"
                  : "var(--text-primary)",
                margin: "8px 0 4px",
              }}>
                {service.name}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: "14px",
                color: service.popular
                  ? isDark ? "#99f6e0" : "#ccfbef"
                  : "var(--text-secondary)",
                lineHeight: "1.5",
                marginBottom: "16px",
              }}>
                {service.description}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "8px" }}>
                <span style={{
                  fontSize: "48px",
                  fontWeight: "800",
                  color: service.popular
                    ? isDark ? "#5eead4" : "white"
                    : "#0d9488",
                  lineHeight: "1",
                }}>
                  {service.price}€
                </span>
                <span style={{
                  fontSize: "16px",
                  color: service.popular
                    ? isDark ? "#99f6e0" : "#ccfbef"
                    : "var(--text-secondary)",
                  marginLeft: "4px",
                }}>
                  {language === "fi" ? "/tunti" : "/hour"}
                </span>
              </div>

              {/* VAT note */}
              <p style={{
                fontSize: "12px",
                color: service.popular
                  ? isDark ? "#99f6e0" : "#ccfbef"
                  : "var(--text-secondary)",
                marginBottom: "20px",
              }}>
                {language === "fi" ? "ALV 25,5% ei sisälly" : "VAT 25.5% not included"}
              </p>

              {/* Features */}
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 28px",
              }}>
                {service.features.map((feature, i) => (
                  <li key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: service.popular
                      ? isDark ? "#99f6e0" : "#ccfbef"
                      : "var(--text-primary)",
                    marginBottom: "10px",
                    fontWeight: "500",
                  }}>
                    <span style={{
                      color: service.popular ? "#5eead4" : "#14b8a6",
                      fontWeight: "800",
                      fontSize: "16px",
                    }}>
                      {"✓"}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Book button */}
              <a href="/booking" style={{
                display: "block",
                textAlign: "center",
                backgroundColor: service.popular ? "white" : "#14b8a6",
                color: service.popular ? "#0d9488" : "white",
                fontSize: "15px",
                fontWeight: "700",
                padding: "14px 24px",
                borderRadius: "12px",
                textDecoration: "none",
              }}>
                {language === "fi" ? "Varaa nyt" : "Book Now"}
              </a>

            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{
          textAlign: "center",
          marginTop: "48px",
          padding: "24px",
          backgroundColor: "var(--bg-card)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
        }}>
          <p style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            margin: "0 0 8px",
          }}>
            {"📞"} {language === "fi"
              ? "Tarvitsetko räätälöidyn tarjouksen? Ota yhteyttä!"
              : "Need a custom quote? Contact us!"
            }
          </p>
          <p style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            margin: 0,
          }}>
            {language === "fi"
              ? "Hinnat ilman ALV 25,5%"
              : " Prices exclude VAT 25.5%"
            }
          </p>
        </div>

      </div>
    </section>
  );
}
