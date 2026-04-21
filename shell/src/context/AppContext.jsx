import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    // ===== NAVBAR =====
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

    // ===== SERVICE NAMES =====
    homeClean:       "Regular Home Cleaning",
    deepClean:       "Deep Cleaning",
    officeClean:     "Office Cleaning",
    moveInOut:       "Move In / Move Out",
    ecoFriendly:     "Eco-Friendly Cleaning",
    windowCleaning:  "Window Cleaning",

    // ===== FOOTER =====
    heroSubtitle:  "J & S Palvelut delivers professional, eco-friendly cleaning services for homes and offices in Helsinki. Founded in 2023, trusted by customers across the city.",
    quickLinks:    "Quick Links",
    workingHours:  "Working Hours",
    monday:        "Monday - Friday",
    saturday:      "Saturday",
    sunday:        "Sunday",
    closed:        "Closed",
    kotivahFooter: "Kotitalousvahennys available",
    founded:       "Founded",

    // ===== PLAN NAMES =====
    planBasic:    "Basic",
    planStandard: "Standard",
    planPremium:  "Premium",

    // ===== HOME PAGE =====
    heroBadge:       "Professional Cleaning Services",
    heroTitle1:      "A Cleaner Home,",
    heroTitle2:      "A Happier Life",
    bookCleaning:    "Book a Cleaning",
    viewServices:    "View Services",
    happyCustomers:  "Happy Customers",
    avgRating:       "Average Rating",
    yearsExp:        "Years Experience",

    // ===== FEATURES =====
    whyChooseUs:    "Why Choose J & S Palvelut?",
    whySubtitle:    "We make cleaning easy, reliable, and worry-free.",
    ecoTitle:       "Eco-Friendly Products",
    ecoDesc:        "We use only non-toxic, biodegradable cleaning products safe for your family and pets.",
    flexTitle:      "Flexible Scheduling",
    flexDesc:       "Book a cleaning at any time — mornings, evenings, or weekends.",
    vettedTitle:    "Vetted Professionals",
    vettedDesc:     "Every cleaner is background-checked, trained, and insured.",
    transTitle:     "Transparent Pricing",
    transDesc:      "No hidden fees. You see the full price before you book.",
    guarTitle:      "Satisfaction Guarantee",
    guarDesc:       "Not happy? We come back and re-clean for free.",
    easyTitle:      "Easy Online Booking",
    easyDesc:       "Book, reschedule, or cancel in seconds from your phone.",

    // ===== CTA =====
    ctaTitle:        "Ready for a Sparkling Clean Home?",
    ctaSubtitle:     "Book your first cleaning today and get 20% off.",
    bookOff:         "Book Now — 20% Off",
    contactUs:       "Contact Us",
    noContracts:     "No contracts",
    insured:         "Insured & vetted",
    ecoFriendlyBadge:"Eco-friendly",
    rated:           "4.9 rated",

    // ===== SERVICES PAGE =====
    servicesBadge:   "What We Offer",
    servicesTitle1:  "Cleaning Services",
    servicesTitle2:  "For Every Need",
    servicesDesc:    "From regular home cleaning to deep cleans and office services.",
    serviceTypes:    "8 Service Types",
    allServices:     "All Services",
    homeFilter:      "Home",
    officeFilter:    "Office",
    specialistFilter:"Specialist",
    bookNowBtn:      "Book Now",
    ourServices:     "Our Cleaning Services",
    ourServicesDesc: "We have a plan for every need and budget.",
    viewAll:         "View All Services",

    // ===== HOW IT WORKS =====
    howItWorks:      "How It Works",
    howSubtitle:     "Getting your home cleaned is simple — just 4 easy steps.",
    step1Title:      "Choose a Service",
    step1Desc:       "Browse our services and pick the one that fits your needs.",
    step2Title:      "Pick a Date & Time",
    step2Desc:       "Select a date and time that works for you.",
    step3Title:      "We Clean Your Space",
    step3Desc:       "Our vetted cleaner arrives on time and does a perfect job.",
    step4Title:      "Enjoy & Review",
    step4Desc:       "Relax in your clean home and leave a review.",
    bookYourCleaning:"Book Your Cleaning Now",

    // ===== PRICING PAGE =====
    pricingBadge:    "Simple, Transparent Pricing",
    pricingTitle1:   "Plans That Fit",
    pricingTitle2:   "Every Budget",
    pricingDesc:     "No hidden fees, no contracts. Pick the plan that works for you.",
    noContractsBadge:"No contracts",
    cancelAnytime:   "Cancel anytime",
    satisfactionGuar:"Satisfaction guarantee",
    monthly:         "Monthly",
    yearly:          "Yearly",
    save20:          "Save 20%",
    perMonth:        "/month",
    allPlansInclude: "All plans include our satisfaction guarantee.",
    vatNotice:       "Prices exclude VAT (ALV 24%)",
    vatDesc:         "All prices shown are before VAT.",
    kotivah:         "Kotitalousvahennys — Save up to 40%!",
    kotivahDesc:     "Finnish customers can claim up to 40% tax deduction on cleaning services.",
    faqTitle:        "Frequently Asked Questions",
    faqSubtitle:     "Everything you need to know about our pricing.",
    stillQuestions:  "Still have questions? We are happy to help!",

    // ===== ABOUT PAGE =====
    aboutBadge:      "Our Story",
    aboutTitle1:     "Cleaning Homes,",
    aboutTitle2:     "Building Trust",
    aboutSubtitle:   "J & S Palvelut Oy was founded in 2023. Based in Helsinki, we serve customers across the city.",
    yearFounded:     "Year Founded",
    teamMembers:     "Team Members",
    revenue2024:     "Revenue 2024",
    ourJourney:      "Our Journey",
    journeySubtitle: "From a small startup to Helsinki's most trusted cleaning service.",
    meetTeam:        "Meet the Team",
    teamSubtitle:    "The dedicated people behind every sparkling clean home.",
    whatWeStandFor:  "What We Stand For",
    valuesSubtitle:  "Our values are at the heart of everything we do.",
    joinTeam:        "Want to Join Our Team?",
    joinDesc:        "Great pay, flexible hours, and a supportive team.",
    getInTouch:      "Get in Touch",

    // ===== VALUES =====
    trustTitle:      "Trust",
    trustDesc:       "Every cleaner is background-checked and insured.",
    qualityTitle:    "Quality",
    qualityDesc:     "Every clean is done to the highest standard.",
    sustainTitle:    "Sustainability",
    sustainDesc:     "All our products are eco-friendly and biodegradable.",
    commTitle:       "Communication",
    commDesc:        "We keep you informed at every step.",

    // ===== REVIEWS PAGE =====
    reviewsBadge:    "Customer Reviews",
    reviewsTitle1:   "What Our Customers",
    reviewsTitle2:   "Are Saying",
    reviewsSubtitle: "Here is what real customers say about their experience.",
    basedOn:         "Based on 2,000+ reviews",
    allReviews:      "All Reviews",
    homeCleaning:    "Home Cleaning",
    deepCleanFilter: "Deep Clean",
    officeFilter2:   "Office",
    loadMore:        "Load More Reviews",
    verifiedCustomer:"Verified Customer",
    joinCustomers:   "Join 2,000+ Happy Customers",
    joinDesc2:       "Experience the J & S Palvelut difference for yourself.",
    verifiedReviews: "2,000+ verified reviews",

    // ===== CONTACT PAGE =====
    contactBadge:    "Get In Touch",
    contactTitle1:   "We Would Love To",
    contactTitle2:   "Hear From You",
    contactSubtitle: "Have a question? Want a quote? We are here to help!",
    sendMessage:     "Send Us a Message",
    formSubtitle:    "Fill in the form and we will get back to you within 24 hours.",
    fullName:        "Full Name",
    emailAddr:       "Email Address",
    phoneOpt:        "Phone Number (optional)",
    serviceInterest: "Service You Are Interested In",
    selectService:   "Select a service...",
    yourMessage:     "Your Message",
    sendBtn:         "Send Message",
    sending:         "Sending...",
    successMsg:      "Message sent successfully!",
    successSub:      "We will get back to you within 24 hours.",
    errorMsg:        "Something went wrong. Please try again.",
    otherWays:       "Other Ways to Reach Us",
    fastResponse:    "Fast Response Guaranteed",
    fastDesc:        "We reply to all messages within 24 hours.",
    findUs:          "Find Us in Helsinki",
    findDesc:        "Based in Helsinki, serving customers across the city.",
    areasServed:     "Areas We Serve",
    areaDesc:        "Not sure if we cover your area? Just send us a message!",
    workingHoursC:   "Mon-Fri: 8am-6pm",
    workingSat:      "Sat: 9am-3pm  |  Sun: Closed",

    // ===== BOOKING PAGE =====
    bookingBadge:    "Easy Online Booking",
    bookingTitle1:   "Book Your",
    bookingTitle2:   "Cleaning Service",
    bookingSubtitle: "Takes less than 2 minutes!",
    back:            "Back",
    continue:        "Continue",
    confirmBooking:  "Confirm Booking",
    bookAnother:     "Book Another Cleaning",
    bookingConfirmed:"Booking Confirmed!",
    bookingThankYou: "Your cleaning is booked. We will send a confirmation to",
    termsNotice:     "By confirming you agree to our terms of service.",
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
    admin:    "Hallinta",
    logout:   "Kirjaudu ulos",
    allRightsReserved: "Kaikki oikeudet pidatetaan",

    // ===== SERVICE NAMES =====
    homeClean:       "Kotisiivous",
    deepClean:       "Syvasiivous",
    officeClean:     "Toimistosiivous",
    moveInOut:       "Muuttosaately",
    ecoFriendly:     "Ymparistoystavallinen",
    windowCleaning:  "Ikkunanpesu",

    // ===== FOOTER =====
    heroSubtitle:  "J & S Palvelut tarjoaa ammattimaisia siivouspalveluja koteihin ja toimistoihin Helsingissa. Perustettu 2023.",
    quickLinks:    "Pikavalikko",
    workingHours:  "Aukioloajat",
    monday:        "Maanantai - Perjantai",
    saturday:      "Lauantai",
    sunday:        "Sunnuntai",
    closed:        "Suljettu",
    kotivahFooter: "Kotitalousvahennys saatavilla",
    founded:       "Perustettu",

    // ===== PLAN NAMES =====
    planBasic:    "Perus",
    planStandard: "Standardi",
    planPremium:  "Premium",

    // ===== HOME PAGE =====
    heroBadge:       "Ammattimaiset siivouspalvelut",
    heroTitle1:      "Puhtaampi koti,",
    heroTitle2:      "onnellisempi elama",
    bookCleaning:    "Varaa siivous",
    viewServices:    "Katso palvelut",
    happyCustomers:  "Tyytyvaista asiakasta",
    avgRating:       "Keskimaarainen arvosana",
    yearsExp:        "Vuotta kokemusta",

    // ===== FEATURES =====
    whyChooseUs:    "Miksi valita J & S Palvelut?",
    whySubtitle:    "Teemme siivouksesta helppoa, luotettavaa ja huoletonta.",
    ecoTitle:       "Ymparistoystavallinen tuotteet",
    ecoDesc:        "Kaytamme vain myrkyttomia, biohajoavia puhdistustuotteita.",
    flexTitle:      "Joustava aikataulu",
    flexDesc:       "Varaa siivous milloin tahansa — aamuisin, iltaisin tai viikonloppuisin.",
    vettedTitle:    "Tarkistetut ammattilaiset",
    vettedDesc:     "Jokainen siivooja on taustatarkistettu, koulutettu ja vakuutettu.",
    transTitle:     "Lapinakyva hinnoittelu",
    transDesc:      "Ei piilomaksuja. Naet koko hinnan ennen varausta.",
    guarTitle:      "Tyytyvaistakuu",
    guarDesc:       "Et ole tyytyvainen? Tulemme siivoamaan uudelleen ilmaiseksi.",
    easyTitle:      "Helppo verkkovaraus",
    easyDesc:       "Varaa, muuta tai peruuta varaus sekunneissa puhelimellasi.",

    // ===== CTA =====
    ctaTitle:        "Valmis kiiltavan puhtaaseen kotiin?",
    ctaSubtitle:     "Varaa ensimmainen siivous tanaan ja saat 20% alennuksen.",
    bookOff:         "Varaa nyt — 20% alennus",
    contactUs:       "Ota yhteytta",
    noContracts:     "Ei sopimuksia",
    insured:         "Vakuutettu ja tarkistettu",
    ecoFriendlyBadge:"Ymparistoystavallinen",
    rated:           "4.9 arvioitu",

    // ===== SERVICES PAGE =====
    servicesBadge:   "Mita tarjoamme",
    servicesTitle1:  "Siivouspalvelut",
    servicesTitle2:  "jokaiseen tarpeeseen",
    servicesDesc:    "Tavallisesta kotisiivouksesta syvasiivoukseen ja toimistopalveluihin.",
    serviceTypes:    "8 palvelutyyppia",
    allServices:     "Kaikki palvelut",
    homeFilter:      "Koti",
    officeFilter:    "Toimisto",
    specialistFilter:"Erikoispalvelut",
    bookNowBtn:      "Varaa nyt",
    ourServices:     "Siivouspalvelumme",
    ourServicesDesc: "Meilla on ratkaisu jokaiseen tarpeeseen ja budjettiin.",
    viewAll:         "Katso kaikki palvelut",

    // ===== HOW IT WORKS =====
    howItWorks:      "Miten se toimii",
    howSubtitle:     "Kotisi siivous on helppoa — vain 4 yksinkertaista vaihetta.",
    step1Title:      "Valitse palvelu",
    step1Desc:       "Selaa palvelujamme ja valitse tarpeisiisi sopiva.",
    step2Title:      "Valitse paiva ja aika",
    step2Desc:       "Valitse sinulle sopiva paiva ja aika.",
    step3Title:      "Siivoamme tilasi",
    step3Desc:       "Ammattisiivooamme saapuu ajoissa ja tekee erinomaisen tyon.",
    step4Title:      "Nauti ja arvioi",
    step4Desc:       "Rentoudu puhtaassa kodissasi ja jata arvostelu.",
    bookYourCleaning:"Varaa siivous nyt",

    // ===== PRICING PAGE =====
    pricingBadge:    "Yksinkertainen, lapinakyva hinnoittelu",
    pricingTitle1:   "Suunnitelmat jokaiselle",
    pricingTitle2:   "budjetille",
    pricingDesc:     "Ei piilomaksuja, ei sopimuksia. Valitse sinulle sopiva suunnitelma.",
    noContractsBadge:"Ei sopimuksia",
    cancelAnytime:   "Peruuta milloin tahansa",
    satisfactionGuar:"Tyytyvaistakuu",
    monthly:         "Kuukausittain",
    yearly:          "Vuosittain",
    save20:          "Saasta 20%",
    perMonth:        "/kuukausi",
    allPlansInclude: "Kaikki suunnitelmat sisaltavat tyytyvaistakuun.",
    vatNotice:       "Hinnat sisaltavat ALV 24%",
    vatDesc:         "Kaikki hinnat on ilmoitettu ennen ALVia.",
    kotivah:         "Kotitalousvahennys — Saasta jopa 40%!",
    kotivahDesc:     "Suomalaiset asiakkaat voivat saada jopa 40% verovahennysta.",
    faqTitle:        "Usein kysytyt kysymykset",
    faqSubtitle:     "Kaikki mita sinun tulee tietaa hinnoittelustamme.",
    stillQuestions:  "Onko sinulla viela kysymyksia? Autamme mielellaamme!",

    // ===== ABOUT PAGE =====
    aboutBadge:      "Tarinamme",
    aboutTitle1:     "Siivoamme koteja,",
    aboutTitle2:     "rakennamme luottamusta",
    aboutSubtitle:   "J & S Palvelut Oy perustettiin vuonna 2023. Sijaitsemme Helsingissa.",
    yearFounded:     "Perustamisvuosi",
    teamMembers:     "Tiimin jasenet",
    revenue2024:     "Liikevaihto 2024",
    ourJourney:      "Matkamme",
    journeySubtitle: "Pienesta yrityksesta Helsingin luotetuimmaksi siivouspalveluksi.",
    meetTeam:        "Tutustu tiimiin",
    teamSubtitle:    "Omistautuneet ihmiset jokaisen kiiltavan puhtaan kodin takana.",
    whatWeStandFor:  "Mita edustamme",
    valuesSubtitle:  "Arvomme ovat kaiken toimintamme ytimessa.",
    joinTeam:        "Haluatko liittya tiimiin?",
    joinDesc:        "Hyva palkka, joustavat tyoajat ja tukeva tiimi.",
    getInTouch:      "Ota yhteytta",

    // ===== VALUES =====
    trustTitle:      "Luottamus",
    trustDesc:       "Jokainen siivooja on taustatarkistettu ja vakuutettu.",
    qualityTitle:    "Laatu",
    qualityDesc:     "Jokainen siivous tehdaan korkeimpien standardien mukaan.",
    sustainTitle:    "Kestavyys",
    sustainDesc:     "Kaikki tuotteemme ovat ymparistoystavallisia ja biohajoavia.",
    commTitle:       "Viestinta",
    commDesc:        "Pidamme sinut ajan tasalla joka vaiheessa.",

    // ===== REVIEWS PAGE =====
    reviewsBadge:    "Asiakasarvostelut",
    reviewsTitle1:   "Mita asiakkaamme",
    reviewsTitle2:   "sanovat",
    reviewsSubtitle: "Tassa on mita todelliset asiakkaat sanovat kokemuksestaan.",
    basedOn:         "Perustuen yli 2 000 arvosteluun",
    allReviews:      "Kaikki arvostelut",
    homeCleaning:    "Kotisiivous",
    deepCleanFilter: "Syvasiivous",
    officeFilter2:   "Toimisto",
    loadMore:        "Lataa lisaa arvosteluja",
    verifiedCustomer:"Vahvistettu asiakas",
    joinCustomers:   "Liity yli 2 000 tyytyvaisen asiakkaan joukkoon",
    joinDesc2:       "Koe J & S Palvelut ero itse. Varaa tanaan!",
    verifiedReviews: "Yli 2 000 vahvistettua arvostelua",

    // ===== CONTACT PAGE =====
    contactBadge:    "Ota yhteytta",
    contactTitle1:   "Haluaisimme kuulla",
    contactTitle2:   "sinusta",
    contactSubtitle: "Onko sinulla kysymys? Haluatko tarjouksen? Olemme taalla!",
    sendMessage:     "Laheta meille viesti",
    formSubtitle:    "Tayta lomake ja palaamme asiaan 24 tunnin kuluessa.",
    fullName:        "Koko nimi",
    emailAddr:       "Sahkopostiosoite",
    phoneOpt:        "Puhelinnumero (valinnainen)",
    serviceInterest: "Palvelu, josta olet kiinnostunut",
    selectService:   "Valitse palvelu...",
    yourMessage:     "Viestisi",
    sendBtn:         "Laheta viesti",
    sending:         "Lahetetaan...",
    successMsg:      "Viesti lahetetty onnistuneesti!",
    successSub:      "Palaamme asiaan 24 tunnin kuluessa.",
    errorMsg:        "Jotain meni pieleen. Yrita uudelleen.",
    otherWays:       "Muut yhteydenottotavat",
    fastResponse:    "Nopea vastaus taattu",
    fastDesc:        "Vastaamme kaikkiin viesteihin 24 tunnin kuluessa.",
    findUs:          "Loyda meidat Helsingista",
    findDesc:        "Sijaitsemme Helsingissa ja palvelemme asiakkaita ympari kaupunkia.",
    areasServed:     "Palvelualueet",
    areaDesc:        "Etkos sure kattaako alueesi? Laheta meille viesti!",
    workingHoursC:   "Ma-Pe: 8-18",
    workingSat:      "La: 9-15  |  Su: Suljettu",

    // ===== BOOKING PAGE =====
    bookingBadge:    "Helppo verkkovaraus",
    bookingTitle1:   "Varaa",
    bookingTitle2:   "siivouspalvelu",
    bookingSubtitle: "Kestaa alle 2 minuuttia!",
    back:            "Takaisin",
    continue:        "Jatka",
    confirmBooking:  "Vahvista varaus",
    bookAnother:     "Varaa uusi siivous",
    bookingConfirmed:"Varaus vahvistettu!",
    bookingThankYou: "Siivouksesi on varattu. Lahetamme vahvistuksen osoitteeseen",
    termsNotice:     "Vahvistamalla hyvaksyt kayttoehtomme.",
  }
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // ✅ Listen for language changes from ALL MFEs including admin
  useEffect(() => {
    const handleStorage = () => {
      const lang = localStorage.getItem("language") || "en";
      setLanguage(lang);
    };

    window.addEventListener("storage", handleStorage);
    // ✅ Poll every second as backup
    const interval = setInterval(handleStorage, 1000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fi" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    // ✅ Notify all MFEs
    window.dispatchEvent(new StorageEvent("storage", {
      key: "language",
      newValue: newLang,
      url: window.location.href,
      storageArea: localStorage,
    }));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Apply dark mode to document
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