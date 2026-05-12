import React from "react";
import { useLanguage } from "./hooks/useLanguage";

var services = [
  {
    id: "home-cleaning",
    color: "#0d9488",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    titleEn: "Home Cleaning",
    titleFi: "Kotisiivous",
    price: "35 euros/hour",
    descEn: "Professional home cleaning tailored to your needs. Our experienced and vetted cleaners will make your home spotless and fresh. We use eco-friendly products that are safe for your family and pets.",
    descFi: "Ammattimainen kotisiivous raataaloituna tarpeisiisi. Kokeneet siivooijamme tekevat kodistasi puhtaan ja raikkaanv. Kaytamme ekologisia tuotteita jotka ovat turvallisia perheellesi.",
    includesEn: [
      "Vacuuming and dusting all rooms",
      "Kitchen cleaning including appliances",
      "Bathroom and toilet cleaning",
      "Floor washing and mopping",
      "Trash removal",
      "Window surface wiping",
    ],
    includesFi: [
      "Polynimurointi ja pyyhinta kaikissa huoneissa",
      "Keittion puhdistus mukaan lukien kodinkoneet",
      "Kylpyhuoneen ja WC puhdistus",
      "Lattioiden pesu",
      "Roskien tyhjennys",
      "Ikkunapintojen pyyhinta",
    ],
  },
  {
    id: "deep-cleaning",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80",
    titleEn: "Deep Cleaning",
    titleFi: "Syvasiivous",
    price: "45 euros/hour",
    descEn: "Thorough cleaning reaching every corner and surface. Our deep cleaning service covers everything from inside cabinets to behind appliances. Perfect for spring cleaning or before moving.",
    descFi: "Perusteellinen siivous joka nurkkaan ja sopukkaan. Syvasiivouspalvelumme kattaa kaiken kaappien sisuksista kodinkoneiden taakse.",
    includesEn: [
      "Everything in home cleaning",
      "Inside cabinet cleaning",
      "Behind and under appliances",
      "Deep bathroom scrubbing",
      "Window washing inside",
      "Disinfection of all surfaces",
    ],
    includesFi: [
      "Kaikki kotisiivouspalvelut",
      "Kaappien sisapuolien puhdistus",
      "Kodinkoneiden takaa ja alta",
      "Kylpyhuoneen syvapuhdistus",
      "Ikkunoiden pesu sisalta",
      "Kaikkien pintojen desinfiointi",
    ],
  },
  {
    id: "office-cleaning",
    color: "#2563eb",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    titleEn: "Office Cleaning",
    titleFi: "Toimistosiivous",
    price: "38 euros/hour",
    descEn: "Keep your office clean and your team productive. We offer flexible scheduling including early morning and evening cleaning to minimize disruption to your business.",
    descFi: "Pida toimistosi siistina ja tiimisi tuottavana. Tarjoamme joustavia aikatauluja mukaan lukien aamuvarhain ja iltatyot.",
    includesEn: [
      "Desk and surface cleaning",
      "Floor vacuuming and washing",
      "Kitchen and break room cleaning",
      "Toilet cleaning and restocking",
      "Trash removal from all areas",
      "Reception area cleaning",
    ],
    includesFi: [
      "Tyopoytien ja tasopintojen puhdistus",
      "Lattioiden imurointi ja pesu",
      "Keittion ja taukotilan siivous",
      "WC-tilojen puhdistus ja taydentaminen",
      "Roskien tyhjennys kaikista tiloista",
      "Vastaanottotilan siivous",
    ],
  },
  {
    id: "move-in-out",
    color: "#d97706",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    titleEn: "Move In / Move Out",
    titleFi: "Muuttosiivous",
    price: "45 euros/hour",
    descEn: "Complete cleaning for moving in or out. We ensure the apartment is in perfect condition for the next tenant or ready for your arrival.",
    descFi: "Tayydellinen siivous muuton yhteydessal. Varmistamme etta asunto on moitteettomassa kunnossa seuraavalle asukkaalle.",
    includesEn: [
      "Full apartment deep clean",
      "Inside all cabinets and drawers",
      "All appliances cleaned inside and out",
      "Window washing inside and outside",
      "Floor polishing",
      "Balcony cleaning",
    ],
    includesFi: [
      "Koko asunnon syvasyivous",
      "Kaikkien kaappien ja laatikoiden sisukset",
      "Kaikki kodinkoneet sisalta ja ulkoa",
      "Ikkunoiden pesu sisalta ja ulkoa",
      "Lattioiden kiillotus",
      "Parvekkeen siivous",
    ],
  },
  {
    id: "window-cleaning",
    color: "#0891b2",
    image:"https://plus.unsplash.com/premium_photo-1676810457640-77cea17fb530?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3",
    titleEn: "Window Cleaning",
    titleFi: "Ikkunanpesu",
    price: "35 euros/hour",
    descEn: "Crystal clear windows inside and outside. Professional window washing using streak-free products. We clean windows at any height safely and efficiently.",
    descFi: "Kirkkaat ikkunat sisalta ja ulkoa. Ammattimainen ikkunanpesu raidattomilla tuotteilla.",
    includesEn: [
      "Inside window washing",
      "Outside window washing",
      "Window frame and sill wiping",
      "Screen cleaning",
      "Stain and mark removal",
      "Streak-free finish guaranteed",
    ],
    includesFi: [
      "Ikkunoiden pesu sisalta",
      "Ikkunoiden pesu ulkoa",
      "Ikkunapuiteiden ja laudan pyyhinta",
      "Hyonteisverkkojen puhdistus",
      "Tahrojen ja jalkien poisto",
      "Raidaton lopputulos taattu",
    ],
  },
  {
    id: "restaurant-bar",
    color: "#059669",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    titleEn: "Restaurant and Bar",
    titleFi: "Ravintola ja baari",
    price: "40 euros/hour",
    descEn: "Professional cleaning for restaurants and bars. We understand the hygiene requirements of food service establishments and ensure full compliance with health regulations.",
    descFi: "Ammattimainen siivous ravintoloille ja baareille. Ymmärrämme elintarvikealan hygieniaajattelut.",
    includesEn: [
      "Kitchen deep cleaning and degreasing",
      "Floor washing and disinfection",
      "Table and chair cleaning",
      "Bar counter and equipment cleaning",
      "Toilet disinfection",
      "Entrance and dining area cleaning",
    ],
    includesFi: [
      "Keittion syvapuhdistus ja rasvanpoisto",
      "Lattioiden pesu ja desinfiointi",
      "Poytien ja tuolien puhdistus",
      "Baaritiskin ja laitteiden puhdistus",
      "WC-tilojen desinfiointi",
      "Sisaankaynti ja ruokailutilan siivous",
    ],
  },
  {
    id: "store-cleaning",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
    titleEn: "Store Cleaning",
    titleFi: "Myymalasiivous",
    price: "38 euros/hour",
    descEn: "Professional store and shop cleaning. We keep your store clean and attractive for customers. Flexible scheduling available before or after business hours.",
    descFi: "Ammattimainen myymalan siivous. Pidamme kauppasi siistina ja houkuttelevana asiakkaille.",
    includesEn: [
      "Floor washing and polishing",
      "Shelf and display cleaning",
      "Entrance and checkout area",
      "Display case cleaning",
      "Toilet cleaning",
      "Trash removal",
    ],
    includesFi: [
      "Lattioiden pesu ja kiillotus",
      "Hyllyjen ja nayttelytilojen puhdistus",
      "Sisaankaynti ja kassaalue",
      "Nayteikyyneiden puhdistus",
      "WC-tilojen puhdistus",
      "Roskien tyhjennys",
    ],
  },
];

export default function ServiceDetail() {
  var { language, t } = useLanguage();

  var pathParts = window.location.pathname.split("/");
  var serviceId = pathParts[pathParts.length - 1];

  var service = null;
  for (var i = 0; i < services.length; i++) {
    if (services[i].id === serviceId) {
      service = services[i];
      break;
    }
  }

  if (!service) {
    return (
      <div style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "16px" }}>
          Service not found
        </h2>
        <a href="/services" style={{ color: "#14b8a6", fontSize: "16px", textDecoration: "none" }}>
          {t.serviceDetailBack || "Back to services"}
        </a>
      </div>
    );
  }

  var title    = language === "fi" ? service.titleFi    : service.titleEn;
  var desc     = language === "fi" ? service.descFi     : service.descEn;
  var includes = language === "fi" ? service.includesFi : service.includesEn;

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* Top banner — no emoji */}
      <div style={{
        backgroundColor: service.color,
        padding: "60px 24px",
        textAlign: "center",
      }}>
        <div style={{ marginBottom: "20px" }}>
          <a href="/services" style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "15px",
            textDecoration: "none",
            fontWeight: "500",
          }}>
            {"<- "}{t.serviceDetailBack || "All Services"}
          </a>
        </div>
        <h1 style={{
          fontSize: "clamp(2rem, 6vw, 4rem)",
          fontWeight: "900",
          color: "white",
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: "0.02em",
        }}>
          {title}
        </h1>
      </div>

      {/* Large image */}
      <div style={{
        width: "100%",
        height: "400px",
        overflow: "hidden",
        backgroundColor: "#e5e7eb",
      }}>
        <img
          src={service.image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Price only — no duration */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "16px",
          padding: "24px",
          textAlign: "center",
          border: "1px solid var(--border-color)",
          marginBottom: "40px",
        }}>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#0d9488", marginBottom: "4px" }}>
            {service.price}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            {t.serviceDetailPrice || "Starting + VAT 25.5%"}
          </div>
        </div>

        {/* About */}
        <h2 style={{
          fontSize: "22px", fontWeight: "800",
          color: "var(--text-primary)", marginBottom: "16px",
        }}>
          {t.serviceDetailAbout || "About this service"}
        </h2>
        <p style={{
          fontSize: "16px", color: "var(--text-secondary)",
          lineHeight: "1.8", marginBottom: "40px",
        }}>
          {desc}
        </p>

        {/* What is included */}
        <h2 style={{
          fontSize: "22px", fontWeight: "800",
          color: "var(--text-primary)", marginBottom: "20px",
        }}>
          {t.serviceDetailIncludes || "What is included"}
        </h2>
        <div style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "16px",
          padding: "8px 24px",
          border: "1px solid var(--border-color)",
          marginBottom: "32px",
        }}>
          {includes.map(function(item, i) {
            return (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 0",
                borderBottom: i < includes.length - 1
                  ? "1px solid var(--border-color)"
                  : "none",
              }}>
                <div style={{
                  width: "28px", height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#f0fdf9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#14b8a6",
                  fontWeight: "800",
                  fontSize: "14px",
                }}>
                  {"✓"}
                </div>
                <span style={{
                  fontSize: "15px",
                  color: "var(--text-primary)",
                  fontWeight: "500",
                }}>
                  {item}
                </span>
              </div>
            );
          })}
        </div>

        {/* Book Now — no emoji */}
        <a
          href="/booking"
          style={{
            display: "block",
            textAlign: "center",
            backgroundColor: "#14b8a6",
            color: "white",
            fontSize: "18px",
            fontWeight: "700",
            padding: "20px 24px",
            borderRadius: "14px",
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(20,184,166,0.35)",
          }}
        >
          {t.serviceDetailBook || "Book This Service"}
        </a>

      </div>
    </div>
  );
}
