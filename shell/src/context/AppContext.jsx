import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    home:     "Home",
    services: "Services",
    pricing:  "Pricing",
    about:    "About",
    reviews:  "Reviews",
    contact:  "Contact",
    bookNow:  "Book Now",
    admin:    "Admin",
    logout:   "Logout",
    heroTitle:    "A Cleaner Home, A Happier Life",
    heroSubtitle: "J & S Palvelut delivers professional, eco-friendly cleaning services for homes and offices in Helsinki.",
    bookCleaning: "Book a Cleaning",
    viewServices: "View Services",
    happyCustomers: "Happy Customers",
    avgRating:      "Average Rating",
    yearsExp:       "Years Experience",
    whyChooseUs:  "Why Choose J & S Palvelut?",
    whySubtitle:  "We make cleaning easy, reliable and worry-free.",
    contactTitle: "We Would Love To Hear From You",
    sendMessage:  "Send Us a Message",
    send:         "Send Message",
    sending:      "Sending...",
    sent:         "Message sent successfully!",
    planBasic:    "Basic",
    planStandard: "Standard",
    planPremium:  "Premium",
    allRightsReserved: "All rights reserved",
       // Navbar
    home:     "Home",
    services: "Services",
    pricing:  "Pricing",
    about:    "About",
    reviews:  "Reviews",
    contact:  "Contact",
    bookNow:  "Book Now",
    admin:    "Admin",
    logout:   "Logout",
    allRightsReserved: "All rights reserved",

    // ✅ Add these missing service names
    homeClean:       "Regular Home Cleaning",
    deepClean:       "Deep Cleaning",
    officeClean:     "Office Cleaning",
    moveInOut:       "Move In / Move Out",
    ecoFriendly:     "Eco-Friendly Cleaning",
    windowCleaning:  "Window Cleaning",

    // ✅ Add hero subtitle for footer
    heroSubtitle: "J & S Palvelut delivers professional, eco-friendly cleaning services for homes and offices in Helsinki. Founded in 2023, trusted by customers across the city.",

    // ✅ Footer column headings
    quickLinks:    "Quick Links",
    workingHours:  "Working Hours",
    monday:        "Monday – Friday",
    saturday:      "Saturday",
    sunday:        "Sunday",
    closed:        "Closed",
    kotivahFooter: "Kotitalousvähennys available",
    founded:       "Founded",
  },

 
  
  fi: {
    home:     "Etusivu",
    services: "Palvelut",
    pricing:  "Hinnat",
    about:    "Meistä",
    reviews:  "Arvostelut",
    contact:  "Yhteystiedot",
    bookNow:  "Varaa nyt",
    admin:    "Hallinta",
    logout:   "Kirjaudu ulos",
    heroTitle:    "Puhtaampi koti, onnellisempi elämä",
    heroSubtitle: "J & S Palvelut tarjoaa ammattimaisia siivouspalveluja koteihin ja toimistoihin Helsingissä.",
    bookCleaning: "Varaa siivous",
    viewServices: "Katso palvelut",
    happyCustomers: "Tyytyväistä asiakasta",
    avgRating:      "Keskimääräinen arvosana",
    yearsExp:       "Vuotta kokemusta",
    whyChooseUs:  "Miksi valita J & S Palvelut?",
    whySubtitle:  "Teemme siivouksesta helppoa, luotettavaa ja huoletonta.",
    contactTitle: "Otamme mielellämme yhteyttä",
    sendMessage:  "Lähetä meille viesti",
    send:         "Lähetä viesti",
    sending:      "Lähetetään...",
    sent:         "Viesti lähetetty onnistuneesti!",
    planBasic:    "Basic",
    planStandard: "Standard",
    planPremium:  "Premium",
    allRightsReserved: "Kaikki oikeudet pidätetään",
    
     // Navbar
    home:     "Etusivu",
    services: "Palvelut",
    pricing:  "Hinnat",
    about:    "Meistä",
    reviews:  "Arvostelut",
    contact:  "Yhteystiedot",
    bookNow:  "Varaa nyt",
    admin:    "Hallinta",
    logout:   "Kirjaudu ulos",
    allRightsReserved: "Kaikki oikeudet pidätetään",

    // ✅ Add these missing service names
    homeClean:       "Kotisiivous",
    deepClean:       "Syvä siivous",
    officeClean:     "Toimistosiivous",
    moveInOut:       "Muuttosäätely",
    ecoFriendly:     "Ympäristöystävällinen",
    windowCleaning:  "Ikkunanpesu",

    // ✅ Add hero subtitle for footer
    heroSubtitle: "J & S Palvelut tarjoaa ammattimaisia siivouspalveluja koteihin ja toimistoihin Helsingissä. Perustettu 2023, luotettu asiakkaiden kesken ympäri kaupungin.",

    // ✅ Footer column headings
    quickLinks:    "Pikavalikko",
    workingHours:  "Aukioloajat",
    monday:        "Maanantai – Perjantai",
    saturday:      "Lauantai",
    sunday:        "Sunnuntai",
    closed:        "Suljettu",
    kotivahFooter: "Kotitalousvähennys saatavilla",
    founded:       "Perustettu",
  },
  };


const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  // ✅ Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fi" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    // ✅ Notify all MFEs
    window.dispatchEvent(new Event("storage"));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    // ✅ Notify all MFEs
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Apply dark mode to document — all MFEs share same document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const t = translations[language];

  return (
    <AppContext.Provider value={{
      language,
      darkMode,
      toggleLanguage,
      toggleDarkMode,
      t,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}