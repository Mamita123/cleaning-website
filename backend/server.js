const express   = require("express");
const cors      = require("cors");
const dotenv    = require("dotenv");

// ✅ Load environment variables
dotenv.config();

// ✅ Import database connection
const { connectDB } = require("./config/db");

// ✅ Connect to Neon PostgreSQL
connectDB();

const app = express();

// ✅ CORS — allow all MFE ports
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

// ✅ Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API routes
app.use("/api/auth",     require("./routes/auth"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/reviews",  require("./routes/reviews"));
app.use("/api/services", require("./routes/services"));

// ✅ Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🧹 Cleaning Website API is running!",
    database: "PostgreSQL (Neon)",
    version: "1.0.0",
  });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});