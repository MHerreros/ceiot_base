const Pool = require('pg').Pool;

// FINISH IMPLEMENTATION OF CONFIG MODULE
// LOOK INTO CONFIG LOADING AFTER POOL (MAKING ENV VARIABLES UNABAILABLE WHEN THE DB CONNECTION STARTS)
const config = require('../../config');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api_db',
  password: 'Ceiot2023',
  port: 5432,
});

module.exports = pool;
