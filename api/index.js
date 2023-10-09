const express = require('express');
const bodyParser = require('body-parser');
// const PgMem = require('pg-mem');
const config = require('./config.js');
// const db = PgMem.newDb();
const { logger } = require('./utils/log.config.js');
const { startDatabase } = require('./infra/db/mongo.database.config');
const deviceRouter = require('./controllers/device.controller.js');
const adminRouter = require('./controllers/admin.controller.js');
const userRouter = require('./controllers/user.controller.js');
const PORT = config.API_PORT;

// Measurements database setup and access
// const database = mongoConfig.startDatabase()
let mongoDb;
const collectionName = 'measurements';

const insertMeasurement = async message => {
  return await mongoDb.collection(collectionName).insertOne(message);
};

const getMeasurements = async () => {
  return await mongoDb.collection(collectionName).find({}).toArray();
};

// API Server
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('spa/static'));
app.use('/device', deviceRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.post('/measurement', async (req, res) => {
  try {
    const measurement = await insertMeasurement({
      id: req.body.id,
      t: req.body.t,
      h: req.body.h,
    });
    logger.info(
      `INSERTED MEASUREMENT: Device ID: ${req.body.id}. Key: ${req.body.key}. Temperature: ${req.body.t}. Humidity: ${req.body.h}`,
    );
    res.send(`Inserted new measurement with ID: ${measurement.insertedId}`);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/web/device', async (req, res) => {
  try {
    const devices = db.public.many('SELECT * FROM devices').map(device => {
      return `
        <tr>
          <td>
            <a href=${config.API_HOST}:${config.API_PORT}/web/device/${device.device_id}>${device.device_id}</a> 
          </td>
          <td>${device.name}</td>
          <td>${device.key} </td>
        </tr>`;
    });
    res.send(
      `<html> 
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
              ${devices} 
          </table> 
        </body> 
      </html>`,
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/web/device/:id', async (req, res) => {
  try {
    const device = db.public.one("SELECT * FROM devices WHERE device_id = '" + req.params.id + "'");
    const template = `
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
    logger.info(`Get Device ${device.device_id} info`);
    res.send(template);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/term/device/:id', async (req, res) => {
  try {
    const device = db.public.one("SELECT * FROM devices WHERE device_id = '" + req.params.id + "'");
    const template = `
      <html>
        <head><title>Devices</title></head>
        <body>
          <p style="color:red">Device Name: ${device.name}</p>
          <p style="color:green">Device Id: ${device.device_id}</p> 
          <p style="color:blue">Device Key: ${device.key}</p> 
        </body>
      </html>`;

    logger.info(`Get Device with Id ${device.device_id}`);
    res.send(template);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/measurement', async (req, res) => {
  try {
    logger.info(`GET Measurements`);
    res.send(await getMeasurements());
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/device', async (req, res) => {
  try {
    logger.info(`GET Devices`);
    res.send(db.public.many('SELECT * FROM devices'));
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Respuesta por default cuando no encuentra la ruta especificada
app.all('*', (req, res) => {
  logger.warn(`Path ${req.path} not implemented`);
  return res.status(404).json(`Ruta '${req.path}' no encontrada.`);
});

startDatabase(config.MONGO_URI)
  .then(async mongoConfig => {
    mongoDb = mongoConfig;

    await Promise.all([
      insertMeasurement({ id: '00', t: '18', h: '78' }),
      insertMeasurement({ id: '00', t: '19', h: '77' }),
      insertMeasurement({ id: '00', t: '17', h: '77' }),
      insertMeasurement({ id: '01', t: '17', h: '77' }),
    ]);

    logger.info('Mongo measurement database Up');

    // db.public.none('CREATE TABLE devices (device_id VARCHAR, name VARCHAR, key VARCHAR)');
    // db.public.none("INSERT INTO devices VALUES ('00', 'Fake Device 00', '123456')");
    // db.public.none("INSERT INTO devices VALUES ('01', 'Fake Device 01', '234567')");
    // db.public.none('CREATE TABLE users (user_id VARCHAR, name VARCHAR, key VARCHAR)');
    // db.public.none("INSERT INTO users VALUES ('1','Ana','admin123')");
    // db.public.none("INSERT INTO users VALUES ('2','Beto','user123')");

    logger.info('SQL device database up');

    app.listen(PORT, () => {
      logger.info(`Listening at ${PORT}`);
    });
  })
  .catch(error => {
    logger.error(error);
    logger.error(`API couldn't be initialized and is shutting down`);
    return;
  });
