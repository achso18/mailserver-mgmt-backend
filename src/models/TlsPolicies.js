const Model = require('./Model');

class TlsPolicies extends Model {

  static get tableName() {
    return 'tlspolicies';
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['domain', 'policy'],
      properties: {
        id: { type: 'integer' },
        domain: { type: 'string', minLength: 1, maxLength: 255 },
        policy: { type: 'string', enum: ['none', 'may', 'encrypt', 'dane', 'dane-only', 'fingerprint', 'verify', 'secure'] },
        params: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  };
}

module.exports = TlsPolicies;
