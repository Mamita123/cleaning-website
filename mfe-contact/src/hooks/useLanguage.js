import { useState, useEffect } from "react";

const translations = {
  en: {
    // ===== NAVBAR =====
    home:     "Home",
    services: "Services",
    pricing:  "Pricing",
    about:    "About",
    reviews:  "Reviews",
    contact:  "Contact",
    bookNow:  "Book Now",

    // ===== CONTACT PAGE =====
    contactBadge:   "Get In Touch",
    contactTitle1:  "We Would Love To",
    contactTitle2:  "Hear From You",
    contactSubtitle:"Have a question about our services? Want to get a custom quote? Or just want to say hello? We are here to help!",
    sendMessage:    "Send Us a Message",
    formSubtitle:   "Fill in the form and we will get back to you within 24 hours.",
    fullName:       "Full Name",
    emailAddr:      "Email Address",
    phoneOpt:       "Phone Number (optional)",
    serviceInterest:"Service You Are Interested In",
    selectService:  "Select a service...",
    yourMessage:    "Your Message",
    sendBtn:        "Send Message",
    sending:        "Sending...",
    successMsg:     "Message sent successfully!",
    successSub:     "We will get back to you within 24 hours.",
    errorMsg:       "Something went wrong. Please try again.",
    otherWays:      "Other Ways to Reach Us",
    fastResponse:   "Fast Response Guaranteed",
    fastDesc:       "We reply to all messages within 24 hours — usually much faster!",
    findUs:         "Find Us in Helsinki",
    findDesc:       "Based in Helsinki, serving customers across the city and surrounding areas.",
    areasServed:    "Areas We Serve",
    areaDesc:       "Not sure if we cover your area? Just send us a message and we will let you know!",
    workingHours:   "Mon-Fri: 8am-6pm",
    workingSat:     "Sat: 9am-3pm  |  Sun: Closed",

    // ===== SERVICE NAMES =====
    homeClean:       "Regular Home Cleaning",
    deepClean:       "Deep Cleaning",
    officeClean:     "Office Cleaning",
    moveInOut:       "Move In / Move Out",
    ecoFriendly:     "Eco-Friendly Cleaning",
    windowCleaning:  "Window Cleaning",
    otherService:    "Other / Not Sure",

    // ===== CONTACT CARD LABELS =====
    phone:           "Phone",
    emailLabel:      "Email",
    addressLabel:    "Address",
    hoursLabel:      "Working Hours",

    // ===== VALIDATION =====
    nameRequired:    "Name is required",
    emailRequired:   "Email is required",

    // ===== PLACEHOLDERS =====
    namePlaceholder: "Your full name",
    emailPlaceholder:"your@email.com",
    phonePlaceholder:"+358 xx xxx xxxx",
    notesPlaceholder:"Tell us about your cleaning needs...",
  },

  fi: {
    // ===== NAVBAR =====
    home:     "Etusivu",
    services: "Palvelut",
    pricing:  "Hinnat",
    about:    "Meista",
    reviews:  "Arvostelut",
    contact:  "Yhteystiedot",
    bookNow:  "Varaa nyt",

    // ===== CONTACT PAGE =====
    contactBadge:   "Ota yhteytta",
    contactTitle1:  "Haluaisimme kuulla",
    contactTitle2:  "sinusta",
    contactSubtitle:"Onko sinulla kysymys palveluistamme? Haluatko tarjouksen? Tai haluatko vain tervehtyia? Olemme taalla auttamassa!",
    sendMessage:    "Laheta meille viesti",
    formSubtitle:   "Tayta lomake ja palaamme asiaan 24 tunnin kuluessa.",
    fullName:       "Koko nimi",
    emailAddr:      "Sahkopostiosoite",
    phoneOpt:       "Puhelinnumero (valinnainen)",
    serviceInterest:"Palvelu, josta olet kiinnostunut",
    selectService:  "Valitse palvelu...",
    yourMessage:    "Viestisi",
    sendBtn:        "Laheta viesti",
    sending:        "Lahetetaan...",
    successMsg:     "Viesti lahetetty onnistuneesti!",
    successSub:     "Palaamme asiaan 24 tunnin kuluessa.",
    errorMsg:       "Jotain meni pieleen. Yrita uudelleen.",
    otherWays:      "Muut yhteydenottotavat",
    fastResponse:   "Nopea vastaus taattu",
    fastDesc:       "Vastaamme kaikkiin viesteihin 24 tunnin kuluessa — yleensa paljon nopeammin!",
    findUs:         "Loyda meidat Helsingista",
    findDesc:       "Sijaitsemme Helsingissa ja palvelemme asiakkaita ympari kaupunkia ja lahialueilla.",
    areasServed:    "Palvelualueet",
    areaDesc:       "Etkos sure kattaako alueesi? Laheta meille viesti ja kerromme!",
    workingHours:   "Ma-Pe: 8-18",
    workingSat:     "La: 9-15  |  Su: Suljettu",

    // ===== SERVICE NAMES =====
    homeClean:       "Kotisiivous",
    deepClean:       "Syvasiivous",
    officeClean:     "Toimistosiivous",
    moveInOut:       "Muuttosaately",
    ecoFriendly:     "Ymparistoystavallinen",
    windowCleaning:  "Ikkunanpesu",
    otherService:    "Muu / En ole varma",

    // ===== CONTACT CARD LABELS =====
    phone:           "Puhelin",
    emailLabel:      "Sahkoposti",
    addressLabel:    "Osoite",
    hoursLabel:      "Aukioloajat",

    // ===== VALIDATION =====
    nameRequired:    "Nimi on pakollinen",
    emailRequired:   "Sahkoposti on pakollinen",

    // ===== PLACEHOLDERS =====
    namePlaceholder: "Koko nimesi",
    emailPlaceholder:"sinun@sahkoposti.fi",
    phonePlaceholder:"+358 xx xxx xxxx",
    notesPlaceholder:"Kerro meille siivoustarpeistasi...",
  }
};

export function useLanguage() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    const handleChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };
    window.addEventListener("storage", handleChange);
    const interval = setInterval(handleChange, 1000);
    return () => {
      window.removeEventListener("storage", handleChange);
      clearInterval(interval);
    };
  }, []);

  return { language, t: translations[language] };
}