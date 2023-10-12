const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
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

app.get('/measurement', async (req, res) => {
  try {
    logger.info(`GET Measurements`);
    res.send(await getMeasurements());
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
