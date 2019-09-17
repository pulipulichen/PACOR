const assert = require('assert');
const app = require('../../src/app');

describe('\'message-database\' service', () => {
  it('registered the service', () => {
    const service = app.service('message-database');

    assert.ok(service, 'Registered the service');
  });
});
