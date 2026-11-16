const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Log unexpected errors on idle database clients
pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL client error:', err);
  process.exit(-1);
});

// Helper function for parameterized queries
const query = (text, params) => pool.query(text, params);

module.exports = {
  pool,
  query,
};
