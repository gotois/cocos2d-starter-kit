/**
 * Сервер логирования
 */

const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: '1or2 server',
  level: 'info'
});

log.info('start logging');