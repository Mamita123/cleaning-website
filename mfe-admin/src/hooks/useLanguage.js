import { useState, useEffect } from "react";

const translations = {
  en: {
    // ===== DASHBOARD =====
    goodMorning:     "Good morning, Admin!",
    happeningToday:  "Here is what is happening today.",
    totalBookings:   "Total Bookings",
    totalRevenue:    "Total Revenue",
    activeCustomers: "Active Customers",
    averageRating:   "Average Rating",
    recentBookings:  "Recent Bookings",
    recentActivity:  "Recent Activity",
    refresh:         "Refresh",
    thisMonth:       "+12% this month",
    thisWeek:        "+5 new this week",
    basedOn:         "Based on 2,000 reviews",

    // ===== NAV =====
    dashboard:  "Dashboard",
    bookings:   "Bookings",
    customers:  "Customers",
    services:   "Services",
    reviews:    "Reviews",
    settings:   "Settings",
    logout:     "Logout",
    adminPanel: "Admin Panel",

    // ===== BOOKINGS PAGE =====
    bookingsTitle:   "Bookings",
    bookingsDesc:    "Manage all customer bookings",
    searchBookings:  "Search by name, email or service...",
    all:             "All",
    pending:         "Pending",
    confirmed:       "Confirmed",
    completed:       "Completed",
    cancelled:       "Cancelled",
    total:           "Total",
    id:              "ID",
    customer:        "Customer",
    service:         "Service",
    dateTime:        "Date & Time",
    address:         "Address",
    status:          "Status",
    amount:          "Amount",
    actions:         "Actions",
    confirm:         "Confirm",
    done:            "Done",
    cancel:          "Cancel",
    loading:         "Loading bookings...",
    noBookings:      "No bookings found",
    cannotConnect:   "Cannot connect to server",
    failedLoad:      "Failed to load bookings",
    date:    "Date",
amount:  "Amount",
actions: "Actions",

    // ===== CUSTOMERS PAGE =====
    customersTitle:  "Customers",
    customersDesc:   "All customers who have made bookings",
    searchCustomers: "Search customers by name or email...",
    totalCustomers:  "Total Customers",
    totalBookingsC:  "Total Bookings",
    totalRevenue2:   "Total Revenue",
    noCustomers:     "No customers yet",
    noCustomersDesc: "Customers will appear here after their first booking",
    bookingsCount:   "Bookings",
    totalSpent:      "Total Spent",

    // ===== SERVICES PAGE =====
    servicesTitle:  "Services",
    servicesDesc:   "Manage your cleaning services and prices",
    active:         "Active",
    inactive:       "Inactive",
    edit:           "Edit",
    disable:        "Disable",
    enable:         "Enable",
    save:           "Save",
    cancelBtn:      "Cancel",
    title:          "Title",
    price:          "Price",
    duration:       "Duration",
    description:    "Description",

    // ===== REVIEWS PAGE =====
    reviewsTitle:   "Reviews",
    reviewsDesc:    "Approve customer reviews before they appear on the website",
    approved:       "Approved",
    approve:        "Approve Review",
    noReviews:      "No reviews yet",
    noReviewsDesc:  "Reviews will appear here after customers submit them",
    avgRating:      "Avg Rating",

    // ===== SETTINGS PAGE =====
    settingsTitle:   "Settings",
    settingsDesc:    "Manage your company information and account settings",
    companyInfo:     "Company Information",
    companyName:     "Company Name",
    email:           "Email",
    phone:           "Phone",
    workingHours:    "Working Hours",
    currency:        "Currency",
    language:        "Language",
    saveSettings:    "Save Settings",
    settingsSaved:   "Settings saved successfully!",
    changePassword:  "Change Password",
    currentPassword: "Current Password",
    newPassword:     "New Password",
    confirmPassword: "Confirm Password",
    changePassBtn:   "Change Password",
    passwordChanged: "Password changed successfully!",
    passwordError:   "New passwords do not match!",
    passwordShort:   "Password must be at least 6 characters",
    systemInfo:      "System Info",
    version:         "Version",
    database:        "Database",
    frontend:        "Frontend",
    backend:         "Backend",
    deployed:        "Deployed",
  },

  fi: {
    // ===== DASHBOARD =====
    goodMorning:     "Hyvää huomenta, Admin!",
    happeningToday:  "Tässä mitä tänään tapahtuu.",
    totalBookings:   "Varauksia yhteensä",
    totalRevenue:    "Liikevaihto yhteensä",
    activeCustomers: "Aktiiviset asiakkaat",
    averageRating:   "Keskimääräinen arvosana",
    recentBookings:  "Viimeisimmät varaukset",
    recentActivity:  "Viimeinen toiminta",
    refresh:         "Päivitä",
    thisMonth:       "+12% tässä kuussa",
    thisWeek:        "+5 uutta tällä viikolla",
    basedOn:         "Perustuen 2 000 arvosteluun",

    // ===== NAV =====
    dashboard:  "Kojelauta",
    bookings:   "Varaukset",
    customers:  "Asiakkaat",
    services:   "Palvelut",
    reviews:    "Arvostelut",
    settings:   "Asetukset",
    logout:     "Kirjaudu ulos",
    adminPanel: "Hallintapaneeli",

    // ===== BOOKINGS PAGE =====
    bookingsTitle:   "Varaukset",
    bookingsDesc:    "Hallinnoi kaikkia asiakasvarauksia",
    searchBookings:  "Hae nimellä, sähköpostilla tai palvelulla...",
    all:             "Kaikki",
    pending:         "Odottaa",
    confirmed:       "Vahvistettu",
    completed:       "Valmis",
    cancelled:       "Peruutettu",
    total:           "Yhteensä",
    id:              "ID",
    customer:        "Asiakas",
    service:         "Palvelu",
    dateTime:        "Päivä ja aika",
    address:         "Osoite",
    status:          "Tila",
    amount:          "Summa",
    actions:         "Toiminnot",
    confirm:         "Vahvista",
    done:            "Valmis",
    cancel:          "Peruuta",
    loading:         "Ladataan varauksia...",
    noBookings:      "Varauksia ei löydy",
    cannotConnect:   "Ei yhteyttä palvelimeen",
    failedLoad:      "Varausten lataus epäonnistui",
    date:    "Paiva",
amount:  "Summa",
actions: "Toiminnot",

    // ===== CUSTOMERS PAGE =====
    customersTitle:  "Asiakkaat",
    customersDesc:   "Kaikki asiakkaat jotka ovat tehneet varauksia",
    searchCustomers: "Hae asiakkaita nimellä tai sähköpostilla...",
    totalCustomers:  "Asiakkaita yhteensä",
    totalBookingsC:  "Varauksia yhteensä",
    totalRevenue2:   "Liikevaihto yhteensä",
    noCustomers:     "Ei asiakkaita vielä",
    noCustomersDesc: "Asiakkaat näkyvät tässä ensimmäisen varauksen jälkeen",
    bookingsCount:   "Varaukset",
    totalSpent:      "Yhteensä käytetty",

    // ===== SERVICES PAGE =====
    servicesTitle:  "Palvelut",
    servicesDesc:   "Hallinnoi siivouspalveluita ja hintoja",
    active:         "Aktiivinen",
    inactive:       "Ei aktiivinen",
    edit:           "Muokkaa",
    disable:        "Poista käytöstä",
    enable:         "Ota käyttöön",
    save:           "Tallenna",
    cancelBtn:      "Peruuta",
    title:          "Otsikko",
    price:          "Hinta",
    duration:       "Kesto",
    description:    "Kuvaus",

    // ===== REVIEWS PAGE =====
    reviewsTitle:   "Arvostelut",
    reviewsDesc:    "Hyväksy asiakasarvostelut ennen kuin ne näkyvät verkkosivustolla",
    approved:       "Hyväksytty",
    approve:        "Hyväksy arvostelu",
    noReviews:      "Ei arvosteluja vielä",
    noReviewsDesc:  "Arvostelut näkyvät tässä kun asiakkaat lähettävät niitä",
    avgRating:      "Keskim. arvosana",

    // ===== SETTINGS PAGE =====
    settingsTitle:   "Asetukset",
    settingsDesc:    "Hallinnoi yritystietoja ja tiliasetuksia",
    companyInfo:     "Yrityksen tiedot",
    companyName:     "Yrityksen nimi",
    email:           "Sähköposti",
    phone:           "Puhelin",
    workingHours:    "Aukioloajat",
    currency:        "Valuutta",
    language:        "Kieli",
    saveSettings:    "Tallenna asetukset",
    settingsSaved:   "Asetukset tallennettu onnistuneesti!",
    changePassword:  "Vaihda salasana",
    currentPassword: "Nykyinen salasana",
    newPassword:     "Uusi salasana",
    confirmPassword: "Vahvista salasana",
    changePassBtn:   "Vaihda salasana",
    passwordChanged: "Salasana vaihdettu onnistuneesti!",
    passwordError:   "Uudet salasanat eivät täsmää!",
    passwordShort:   "Salasanan on oltava vähintään 6 merkkiä",
    systemInfo:      "Järjestelmätiedot",
    version:         "Versio",
    database:        "Tietokanta",
    frontend:        "Käyttöliittymä",
    backend:         "Palvelin",
    deployed:        "Käyttöönotettu",
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