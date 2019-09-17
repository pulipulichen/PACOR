const { Service } = require('feathers-knex');

exports.Messages = class Messages extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'messages'
    });
  }
};
