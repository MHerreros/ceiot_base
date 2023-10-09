const express = require('express');
const { Router } = express;
const { logger } = require('../utils/log.config.js');
const deviceRouter = Router();

deviceRouter.get('', async (req, res) => {
  try {
    logger.info(`GET Users`);
    // const data = await getUsers();
    // return res.status(200).json(data.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

deviceRouter.post('', async (req, res) => {
  try {
    const device = await db.public.one(
      "INSERT INTO devices VALUES ('" +
        req.body.id +
        "', '" +
        req.body.n +
        "', '" +
        req.body.k +
        "')",
    );
    logger.info(
      `INSERTED DEVICE: Device ID: ${req.body.id}. Device Name: ${req.body.n}. Device Key: ${req.body.k}`,
    );
    res.send(`Created new device with ID: ${device}`);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = deviceRouter;
