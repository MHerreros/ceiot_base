const express = require('express');
const { Router } = express;
const { logger } = require('../utils/log.config.js');
const { getUsers } = require('../services/user.service.js');
const userRouter = Router();

userRouter.get('', async (req, res) => {
  try {
    logger.info(`GET Users`);
    const data = await getUsers();
    return res.status(200).json(data.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = userRouter;
