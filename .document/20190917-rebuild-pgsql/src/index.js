/* eslint-disable no-console */
const logger = require('./logger');
const {app, server} = require('./app');
const port = app.get('port');
//const server = app.listen(3030);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
