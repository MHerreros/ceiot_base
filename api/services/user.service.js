const pool = require('../infra/db/postgre.database.config.js');

const getUsers = async () => {
  return await pool.query('SELECT * FROM users ORDER BY user_id ASC');
};

module.exports = { getUsers };
