const dotenv = require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  API_PORT: process.env.API_PORT,
  API_HOST: process.env.API_HOST,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
};
