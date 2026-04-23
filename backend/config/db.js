/*const { Pool } = require("pg");

// ✅ Create a connection pool to Neon PostgreSQL
// Pool manages multiple connections efficiently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // ✅ Required for Neon — uses SSL encryption
    rejectUnauthorized: false,
  },
});

// ✅ Test the connection
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected to Neon!");
    client.release();
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

// ✅ Export both the pool (for queries) and connectDB (for startup)
module.exports = { pool, connectDB };*/

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