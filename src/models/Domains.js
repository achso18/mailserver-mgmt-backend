const Model = require('./Model');

class Domains extends Model {

  static get tableName() {
    return 'domains';
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['domain'],
      properties: {
        id: { type: 'integer' },
        domain: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  };
}

module.exports = Domains;
