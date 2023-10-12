const pool = require('../infra/db/postgre.database.config.js');
const {
  getAllDevicesRepository,
  getDeviceByIdRepository,
  createDeviceRepository,
} = require('../repositories/device.repository.js');
const { logger } = require('../utils/log.config.js');
const config = require('../config.js');

const getAllDevices = async () => {
  return await getAllDevicesRepository();
};

const getDeviceById = async id => {
  return await getDeviceByIdRepository(id);
};

const createDevice = async data => {
  return await createDeviceRepository(data);
};

const getAllDevicesForWeb = async () => {
  const devices = await getAllDevices();

  if (!devices || devices.length === 0) {
    logger.warn(`Devices not found`);
    return [];
  }

  const tableRows = devices.map(device => {
    return `
        <tr>
          <td>
            <a href=${config.API_HOST}:${config.API_PORT}/web/device/${device.device_id}>${device.device_id}</a> 
          </td>
          <td>${device.name}</td>
          <td>${device.key} </td>
        </tr>`;
  });

  return `
    <html> 
      <head>
        <title>Sensores</title>
      </head> 
      <body>
        <table border="1"> 
          <tr>
            <th>id</th>
            <th>name</th>
            <th>key</th>
          </tr> 
            ${tableRows} 
        </table> 
      </body> 
    </html>`;
};

const getDeviceByIdForWeb = async id => {
  const device = await getDeviceById(id);

  if (!device || device.length === 0) {
    logger.warn(`Device not found`);
    return [];
  }

  return `
      <html>
        <head>
          <title>Sensor ${device.name}</title>
        </head>
        <body>
        <h1>${device.name}</h1>
          <p>Id: ${device.device_id}</p>
          <p>Key: ${device.key}</p>
        </body>
      </html>`;
};

const getDeviceByIdTerm = async id => {
  const device = await getDeviceById(id);

  if (!device || device.length === 0) {
    logger.warn(`Devices not found`);
    return [];
  }

  return `
      <html>
        <head><title>Devices</title></head>
        <body>
          <p style="color:red">Device Name: ${device.name}</p>
          <p style="color:green">Device Id: ${device.device_id}</p> 
          <p style="color:blue">Device Key: ${device.key}</p> 
        </body>
      </html>`;
};
module.exports = {
  getAllDevices,
  createDevice,
  getDeviceById,
  getAllDevicesForWeb,
  getDeviceByIdForWeb,
  getDeviceByIdTerm,
};
