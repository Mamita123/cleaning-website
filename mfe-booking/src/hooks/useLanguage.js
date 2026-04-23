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

    // ===== BOOKING HERO =====
    bookingBadge:    "Easy Online Booking",
    bookingTitle1:   "Book Your",
    bookingTitle2:   "Cleaning Service",
    bookingSubtitle: "Choose your service, pick a date and time, and we will take care of the rest. Takes less than 2 minutes!",
    step1Label:      "1. Choose service",
    step2Label:      "2. Pick date & time",
    step3Label:      "3. Your details",
    step4Label:      "4. Confirm",

    // ===== STEP LABELS =====
    stepService:  "Service",
    stepDateTime: "Date & Time",
    stepDetails:  "Your Details",
    stepConfirm:  "Confirm",

    // ===== STEP 1 — Service =====
    chooseServiceTitle: "Choose a Service",
    chooseServiceDesc:  "Select the cleaning service that best fits your needs.",

    // ===== STEP 2 — Date & Time =====
    pickDateTitle: "Pick a Date & Time",
    pickDateDesc:  "Select your preferred date and time slot. Sundays are unavailable.",

    // ===== STEP 3 — Details =====
    detailsTitle: "Your Details",
    detailsDesc:  "Tell us where to clean and how to reach you.",

    // ===== STEP 4 — Confirm =====
    confirmTitle: "Confirm Your Booking",
    confirmDesc:  "Please review your booking details before confirming.",

    // ===== SERVICE NAMES =====
    regularHome:    "Regular Home Cleaning",
    deepCleaning:   "Deep Cleaning",
    officeCleaning: "Office Cleaning",
    moveInOut:      "Move In / Move Out",
    ecoFriendly:    "Eco-Friendly Cleaning",
    windowCleaning: "Window Cleaning",

    // ===== FORM FIELDS =====
    fullName:        "Full Name",
    emailAddr:       "Email",
    phoneOpt:        "Phone Number (optional)",
    cleaningAddress: "Cleaning Address",
    specialInstr:    "Special Instructions (optional)",
    namePlaceholder: "Your full name",
    emailPlaceholder:"your@email.com",
    phonePlaceholder:"+358 xx xxx xxxx",
    addrPlaceholder: "Street address, city, postcode",
    notesPlaceholder:"Any special requests, allergies, access instructions...",

    // ===== VALIDATION =====
    nameRequired:    "Name is required",
    emailRequired:   "Email is required",
    addrRequired:    "Address is required",
    selectDateErr:   "Please select a date",
    selectTimeErr:   "Please select a time",
    selectServiceErr:"Please select a service",

    // ===== CONFIRM SUMMARY =====
    service:  "Service",
    price:    "Price",
    duration: "Duration",
    date:     "Date",
    time:     "Time",
    name:     "Name",
    email:    "Email",
    address:  "Address",
    termsNotice: "By confirming you agree to our terms of service. You can cancel or reschedule up to 24 hours before your booking.",

    // ===== BUTTONS =====
    back:           "Back",
    continue:       "Continue",
    confirmBooking: "Confirm Booking",
    bookAnother:    "Book Another Cleaning",

    // ===== BOOKING CONFIRMED =====
    bookingConfirmed: "Booking Confirmed!",
    bookingThankYou:  "Your cleaning is booked. We will send a confirmation to",

    // ===== CALENDAR =====
    selectTime:  "Select a Time",
    today:       "Today",
    selected:    "Selected",
    unavailable: "Unavailable",

    // ===== PRICE =====
    from: "From",
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

    // ===== BOOKING HERO =====
    bookingBadge:    "Helppo verkkovaraus",
    bookingTitle1:   "Varaa",
    bookingTitle2:   "siivouspalvelu",
    bookingSubtitle: "Valitse palvelu, valitse paiva ja aika, me hoidamme loput. Kestaa alle 2 minuuttia!",
    step1Label:      "1. Valitse palvelu",
    step2Label:      "2. Valitse paiva ja aika",
    step3Label:      "3. Tietosi",
    step4Label:      "4. Vahvista",

    // ===== STEP LABELS =====
    stepService:  "Palvelu",
    stepDateTime: "Paiva ja aika",
    stepDetails:  "Tietosi",
    stepConfirm:  "Vahvista",

    // ===== STEP 1 — Service =====
    chooseServiceTitle: "Valitse palvelu",
    chooseServiceDesc:  "Valitse tarpeisiisi parhaiten sopiva siivouspalvelu.",

    // ===== STEP 2 — Date & Time =====
    pickDateTitle: "Valitse paiva ja aika",
    pickDateDesc:  "Valitse haluamasi paiva ja aika. Sunnuntait eivat ole saatavilla.",

    // ===== STEP 3 — Details =====
    detailsTitle: "Tietosi",
    detailsDesc:  "Kerro meille missa siivota ja miten tavoittaa sinut.",

    // ===== STEP 4 — Confirm =====
    confirmTitle: "Vahvista varauksesi",
    confirmDesc:  "Tarkista varauksen tiedot ennen vahvistamista.",

    // ===== SERVICE NAMES =====
    regularHome:    "Kotisiivous",
    deepCleaning:   "Syvasiivous",
    officeCleaning: "Toimistosiivous",
    moveInOut:      "Muuttosaately",
    ecoFriendly:    "Ymparistoystavallinen",
    windowCleaning: "Ikkunanpesu",

    // ===== FORM FIELDS =====
    fullName:        "Koko nimi",
    emailAddr:       "Sahkoposti",
    phoneOpt:        "Puhelinnumero (valinnainen)",
    cleaningAddress: "Siivousosoite",
    specialInstr:    "Erityisohjeet (valinnainen)",
    namePlaceholder: "Koko nimesi",
    emailPlaceholder:"sinun@sahkoposti.fi",
    phonePlaceholder:"+358 xx xxx xxxx",
    addrPlaceholder: "Katuosoite, kaupunki, postinumero",
    notesPlaceholder:"Erityistoiveet, allergiat, kulkuohjeet...",

    // ===== VALIDATION =====
    nameRequired:    "Nimi on pakollinen",
    emailRequired:   "Sahkoposti on pakollinen",
    addrRequired:    "Osoite on pakollinen",
    selectDateErr:   "Valitse paiva",
    selectTimeErr:   "Valitse aika",
    selectServiceErr:"Valitse palvelu",

    // ===== CONFIRM SUMMARY =====
    service:  "Palvelu",
    price:    "Hinta",
    duration: "Kesto",
    date:     "Paiva",
    time:     "Aika",
    name:     "Nimi",
    email:    "Sahkoposti",
    address:  "Osoite",
    termsNotice: "Vahvistamalla hyvaksyt kayttoehtomme. Voit peruuttaa tai siirtaa varausta enintaan 24 tuntia ennen siivousta.",

    // ===== BUTTONS =====
    back:           "Takaisin",
    continue:       "Jatka",
    confirmBooking: "Vahvista varaus",
    bookAnother:    "Varaa uusi siivous",

    // ===== BOOKING CONFIRMED =====
    bookingConfirmed: "Varaus vahvistettu!",
    bookingThankYou:  "Siivouksesi on varattu. Lahetamme vahvistuksen osoitteeseen",

    // ===== CALENDAR =====
    selectTime:  "Valitse aika",
    today:       "Tanaan",
    selected:    "Valittu",
    unavailable: "Ei saatavilla",

    // ===== PRICE =====
    from: "Alkaen",
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