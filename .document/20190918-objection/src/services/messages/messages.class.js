const { Service } = require('feathers-objection');

exports.Messages = class Messages extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
