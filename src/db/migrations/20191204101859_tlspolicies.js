
exports.up = (knex, Promise) => knex.schema.createTable('tlspolicies', t => {
  t.increments('id').primary();
  t.string('domain', 256).unique();
  t.enu('policy', ['none', 'may', 'encrypt', 'dane', 'dane-only', 'fingerprint', 'verify', 'secure']).notNullable();
  t.string('params', 256);
});

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('tlspolicies');
