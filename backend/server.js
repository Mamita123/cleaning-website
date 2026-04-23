const express  = require("express");
const cors     = require("cors");
const path     = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005",
    "http://localhost:3006",
    "http://localhost:3007",
    "http://localhost:3008",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes    = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");
const contactRoutes = require("./routes/contacts");
const reviewRoutes  = require("./routes/reviews");
const serviceRoutes = require("./routes/services");

app.get("/", (req, res) => {
  res.json({ success: true, message: "J & S Palvelut API is running!" });
});

app.use("/api/auth",     authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/reviews",  reviewRoutes);
app.use("/api/services", serviceRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const pool = require("./config/db");
pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("❌ Database test failed:", err.message);
  } else {
    console.log("✅ Database query test passed!");
  }
});