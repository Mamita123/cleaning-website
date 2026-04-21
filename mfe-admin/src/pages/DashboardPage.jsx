import React, { useState } from "react";
import AdminNav       from "../components/AdminNav";
import StatsCards     from "../sections/StatsCards";
import BookingsTable  from "../sections/BookingsTable";
import RecentActivity from "../sections/RecentActivity";
import BookingsPage   from "./BookingsPage";
import CustomersPage  from "./CustomersPage";
import ServicesPage   from "./ServicesPage";
import ReviewsPage    from "./ReviewsPage";
import SettingsPage   from "./SettingsPage";

export default function DashboardPage({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardHome />;
      case "bookings":  return <BookingsPage />;
      case "customers": return <CustomersPage />;
      case "services":  return <ServicesPage />;
      case "reviews":   return <ReviewsPage />;
      case "settings":  return <SettingsPage />;
      default:          return <DashboardHome />;
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
    }}>

      {/* ✅ Only ONE AdminNav here */}
      <AdminNav
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={onLogout}
      />

      {/* ✅ Page content changes here */}
      <main style={{
        flex: 1,
        padding: "32px",
        overflowY: "auto",
        minWidth: 0,
      }}>
        {renderPage()}
      </main>

    </div>
  );
}

// ✅ Dashboard home — shown when Dashboard is active
function DashboardHome() {
  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div>
          <h1 style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: "800",
            color: "#134e4a",
            marginBottom: "4px",
          }}>
            Good morning, Admin! 👋
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Here is what is happening today.
          </p>
        </div>
        <div style={{
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          📅 {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      <StatsCards />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
      }}>
        <BookingsTable />
        <RecentActivity />
      </div>
    </>
  );
}