// Initializes the `message-database` service on path `/message-database`
const { MessageDatabase } = require('./message-database.class');
const createModel = require('../../models/message-database.model');
const hooks = require('./message-database.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/message-database', new MessageDatabase(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('message-database');

  service.hooks(hooks);
};
