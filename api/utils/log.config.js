const log4js = require('log4js');

log4js.configure({
  appenders: {
    default: { type: 'file', filename: './logs/default.log' },
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['default', 'console'], level: 'info' },
  },
});

const logger = log4js.getLogger('default');

module.exports = {
  logger,
};
