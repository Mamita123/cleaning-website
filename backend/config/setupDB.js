const fs       = require("fs");
const path     = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { Pool } = require("pg");

// ✅ Create pool directly here for setup script
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const setupDatabase = async () => {
  try {
    console.log("🔧 Setting up database tables...");
    console.log("🔗 Connecting to:", process.env.DATABASE_URL ? "URL found ✅" : "URL missing ❌");

    const sql = fs.readFileSync(
      path.join(__dirname, "schema.sql"),
      "utf8"
    );

    await pool.query(sql);
    console.log("✅ All tables created successfully!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error setting up database:", error.message);
    process.exit(1);
  }
};

setupDatabase();