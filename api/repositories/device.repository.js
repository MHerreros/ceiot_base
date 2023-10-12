const pool = require('../infra/db/postgre.database.config.js');

const getAllDevicesRepository = async () => {
  return (await pool.query('SELECT * FROM devices')).rows;
};

const getDeviceByIdRepository = async id => {
  return (await pool.query(`SELECT * FROM devices WHERE devices."device_id" = '${id}'`)).rows[0]; // Get first device with the required id
};

const createDeviceRepository = async data => {
  return await pool.query(
    `INSERT INTO devices ("device_id","name","key") VALUES ('${data.id}','${data.n}','${data.k}')`,
  );
};
module.exports = { getAllDevicesRepository, createDeviceRepository, getDeviceByIdRepository };
