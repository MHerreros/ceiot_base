const pool = require('../infra/db/postgre.database.config.js');

const getUsersRepository = async () => {
  return (await pool.query('SELECT * FROM users ORDER BY user_id ASC')).rows;
};

module.exports = { getUsersRepository };
