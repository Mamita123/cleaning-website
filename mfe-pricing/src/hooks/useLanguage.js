import { useState, useEffect } from "react";

const translations = {
  en: {
    home:     "Home",
    services: "Services",
    pricing:  "Pricing",
    about:    "About",
    reviews:  "Reviews",
    contact:  "Contact",
    bookNow:  "Book Now",

    // ✅ Pricing page
    pricingBadge:    "Simple, Transparent Pricing",
    pricingTitle1:   "Plans That Fit",
    pricingTitle2:   "Every Budget",
    pricingDesc:     "No hidden fees, no contracts. Pick the plan that works for you and get a sparkling clean home every time.",
    noContractsBadge: "No contracts",
    cancelAnytime:   "Cancel anytime",
    satisfactionGuar: "Satisfaction guarantee",
    monthly:         "Monthly",
    yearly:          "Yearly",
    save20:          "Save 20%",
    perMonth:        "/month",
    allPlansInclude: "All plans include our satisfaction guarantee. Not happy? We re-clean for free.",
    vatNotice:       "Prices exclude VAT (ALV 24%)",
    vatDesc:         "All prices shown are before VAT. Final invoice will include 24% ALV.",
    kotivah:         "Kotitalousvahennys — Save up to 40%!",
    kotivahDesc:     "Finnish customers can claim a household tax deduction of up to 40% on cleaning services.",
    faqTitle:        "Frequently Asked Questions",
    faqSubtitle:     "Everything you need to know about our pricing and plans.",
    stillQuestions:  "Still have questions? We are happy to help!",
    contactUs:       "Contact Us",

    // ✅ Plan names
    planBasic:    "Basic",
    planStandard: "Standard",
    planPremium:  "Premium",

    // ✅ Plan descriptions
    planBasicDesc:    "Perfect for small apartments and single occupants.",
    planStandardDesc: "Our most popular plan for families and larger homes.",
    planPremiumDesc:  "Full-service cleaning for large homes and busy families.",

    // ✅ Plan CTAs
    planBasicCta:    "Get Started",
    planStandardCta: "Most Popular",
    planPremiumCta:  "Go Premium",

    // ✅ Plan features Basic
    basicF1: "1 bedroom / 1 bathroom",
    basicF2: "Vacuuming and mopping",
    basicF3: "Surface dusting",
    basicF4: "Kitchen wipe-down",
    basicF5: "Bathroom cleaning",
    basicF6: "Bi-weekly scheduling",
    basicN1: "Deep cleaning",
    basicN2: "Inside oven/fridge",
    basicN3: "Window cleaning",

    // ✅ Plan features Standard
    stdF1: "Up to 3 bedrooms / 2 bathrooms",
    stdF2: "Everything in Basic",
    stdF3: "Inside oven and fridge",
    stdF4: "Window cleaning",
    stdF5: "Weekly scheduling",
    stdF6: "Priority booking",
    stdN1: "Move in/out clean",
    stdN2: "Garage cleaning",

    // ✅ Plan features Premium
    premF1: "Unlimited bedrooms/bathrooms",
    premF2: "Everything in Standard",
    premF3: "Deep cleaning included",
    premF4: "Move in/out clean",
    premF5: "Garage cleaning",
    premF6: "Same-day booking available",

    // ✅ Most popular badge
    mostPopular: "Most Popular",
  },

  fi: {
    home:     "Etusivu",
    services: "Palvelut",
    pricing:  "Hinnat",
    about:    "Meista",
    reviews:  "Arvostelut",
    contact:  "Yhteystiedot",
    bookNow:  "Varaa nyt",

    // ✅ Pricing page
    pricingBadge:    "Yksinkertainen, lapinakyva hinnoittelu",
    pricingTitle1:   "Suunnitelmat jokaiselle",
    pricingTitle2:   "budjetille",
    pricingDesc:     "Ei piilomaksuja, ei sopimuksia. Valitse sinulle sopiva suunnitelma ja saat aina puhtaan kodin.",
    noContractsBadge: "Ei sopimuksia",
    cancelAnytime:   "Peruuta milloin tahansa",
    satisfactionGuar: "Tyytyvaistakuu",
    monthly:         "Kuukausittain",
    yearly:          "Vuosittain",
    save20:          "Saasta 20%",
    perMonth:        "/kuukausi",
    allPlansInclude: "Kaikki suunnitelmat sisaltavat tyytyvaistakuun. Et ole tyytyvainen? Siivoamme uudelleen ilmaiseksi.",
    vatNotice:       "Hinnat sisaltavat ALV 24%",
    vatDesc:         "Kaikki hinnat on ilmoitettu ennen ALVia. Lopullinen lasku sisaltaa 24% ALVin.",
    kotivah:         "Kotitalousvahennys — Saasta jopa 40%!",
    kotivahDesc:     "Suomalaiset asiakkaat voivat vaatia kotitalousvahennysta jopa 40% siivouspalveluiden tyokustannuksista.",
    faqTitle:        "Usein kysytyt kysymykset",
    faqSubtitle:     "Kaikki mita sinun tulee tietaa hinnoittelustamme ja suunnitelmistamme.",
    stillQuestions:  "Onko sinulla viela kysymyksia? Autamme mielellaamme!",
    contactUs:       "Ota yhteytta",

    // ✅ Plan names
    planBasic:    "Perus",
    planStandard: "Standardi",
    planPremium:  "Premium",

    // ✅ Plan descriptions
    planBasicDesc:    "Sopii pieniin asuntoihin ja yhden hengen talouksiin.",
    planStandardDesc: "Suosituin suunnitelma perheille ja suuremmille kodeille.",
    planPremiumDesc:  "Taydellinen palvelu suurille kodeille ja kiireisille perheille.",

    // ✅ Plan CTAs
    planBasicCta:    "Aloita nyt",
    planStandardCta: "Suosituin",
    planPremiumCta:  "Valitse Premium",

    // ✅ Plan features Basic
    basicF1: "1 makuuhuone / 1 kylpyhuone",
    basicF2: "Imurointi ja moppaus",
    basicF3: "Pintojen polyjen pyyhinta",
    basicF4: "Keittion pyyhinta",
    basicF5: "Kylpyhuoneen siivous",
    basicF6: "Kahden viikon valein",
    basicN1: "Syva siivous",
    basicN2: "Uunin/jaakapin sisapuoli",
    basicN3: "Ikkunoiden pesu",

    // ✅ Plan features Standard
    stdF1: "Enintaan 3 makuuhuonetta / 2 kylpyhuonetta",
    stdF2: "Kaikki Perus-suunnitelmasta",
    stdF3: "Uunin ja jaakapin sisapuoli",
    stdF4: "Ikkunoiden pesu",
    stdF5: "Viikoittainen aikataulu",
    stdF6: "Prioriteettivaraus",
    stdN1: "Muuttosaately",
    stdN2: "Autotallin siivous",

    // ✅ Plan features Premium
    premF1: "Rajoittamaton maara huoneita",
    premF2: "Kaikki Standardi-suunnitelmasta",
    premF3: "Syvasiivous sisaltaa",
    premF4: "Muuttosaately",
    premF5: "Autotallin siivous",
    premF6: "Saman paivan varaus mahdollinen",

    // ✅ Most popular badge
    mostPopular: "Suosituin",
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