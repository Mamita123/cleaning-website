const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
  } else {
    console.log("✅ PostgreSQL Connected to Neon!");
    release();
  }
});

// ✅ Export both ways so both imports work!
module.exports = pool;
module.exports.pool = pool;