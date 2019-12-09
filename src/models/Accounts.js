const Model = require('./Model');

class Accounts extends Model {

  static get tableName() {
    return 'accounts';
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'domain', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 63 },
        domain: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        quota: { type: 'integer' },
        enabled: { type: 'boolean' },
        sendonly: { type: 'boolean' }
      }
    };
  };
}

module.exports = Accounts;
