const Model = require('./Model');

class Aliases extends Model {

  static get tableName() {
    return 'aliases';
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['src_usr', 'src_dom', 'dst_usr', 'dst_dom'],
      properties: {
        id: { type: 'integer' },
        src_usr: { type: 'string', minLength: 1, maxLength: 255 },
        src_dom: { type: 'string', minLength: 1, maxLength: 255 },
        dst_usr: { type: 'string', minLength: 1, maxLength: 255 },
        dst_dom: { type: 'string', minLength: 1, maxLength: 255 },
        enabled: { type: 'boolean' }
      }
    };
  };
}

module.exports = Aliases;
