const express = require('express');
const { Router } = express;
const { logger } = require('../utils/log.config.js');
const {
  getAllDevices,
  createDevice,
  getDeviceById,
  getAllDevicesForWeb,
  getDeviceByIdForWeb,
  getDeviceByIdTerm,
} = require('../services/device.service.js');

const deviceRouter = Router();

deviceRouter.get('/web', async (req, res) => {
  try {
    logger.info('GET All Devices');
    return res.send(await getAllDevicesForWeb());
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

deviceRouter.get('/:id/web', async (req, res) => {
  try {
    logger.info(`Get Device ${req.params.id} info`);
    return res.send(await getDeviceByIdForWeb(req.params.id));
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

deviceRouter.get('/:id/term', async (req, res) => {
  try {
    logger.info(`Get Device with Id ${req.params.id}`);
    return res.send(await getDeviceByIdTerm(req.params.id));
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

deviceRouter.get('/:id', async (req, res) => {
  try {
    logger.info(`GET Device By Id`);
    return res.send(await getDeviceById(req.params.id));
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

deviceRouter.get('', async (req, res) => {
  try {
    logger.info(`GET All Devices`);
    return res.send(await getAllDevices());
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

deviceRouter.post('', async (req, res) => {
  try {
    const device = await createDevice(req.body);
    logger.info(
      `INSERTED DEVICE: Device ID: ${req.body.id}. Device Name: ${req.body.n}. Device Key: ${req.body.k}`,
    );
    return res.send(`Created new device with ID: ${device}`);
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = deviceRouter;
