const express = require('express');
const { Router } = express;
const adminRouter = Router();
const { logger } = require('../utils/log.config.js');
const { persistDbToFile } = require('../services/admin.service.js');

adminRouter.get('/:command', async (req, res) => {
  try {
    logger.info(`Persist DB`);
    return res.send(await persistDbToFile(req.params.command, req.query.db, req.query.file));
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = adminRouter;
