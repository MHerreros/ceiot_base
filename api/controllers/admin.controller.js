const express = require('express');
const { Router } = express;
const adminRouter = Router();
const fs = require('fs');
const { logger } = require('../utils/log.config.js');

adminRouter.get('/:command', async (req, res) => {
  try {
    let msg = 'done';
    switch (req.params.command) {
      case 'clear':
        if (req.query.db == 'mongo') {
          msg = 'clearing mongo';
          /* UNIMPLEMENTED */
        } else if (req.query.db == 'psql') {
          msg = 'clearing psql';
          /* UNIMPLEMENTED */
        } else {
          msg = 'unknown db ' + req.query.db;
        }
        break;
      case 'save':
        if (req.query.db == 'mongo') {
          msg = 'saving mongo to ' + req.query.file;
          /* UNIMPLEMENTED */
        } else if (req.query.db == 'psql') {
          msg = 'saving psql ' + req.query.file;
          /* UNIMPLEMENTED */
        } else {
          msg = 'unknown db ' + req.query.db;
        }
        break;
      case 'show':
        msg = fs.readFileSync('../../fixtures/' + req.query.file);
        break;
      default:
        msg = 'Command: ' + req.params.command + ' not implemented';
    }
    const template = `<html>
        <head><title>Admin</title></head>
        <body>
          ${msg}
        </body>
      </html>`;
    logger.info(msg);
    res.send(template);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = adminRouter;
