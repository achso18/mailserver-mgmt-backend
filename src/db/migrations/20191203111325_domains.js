
exports.up = (knex, Promise) => knex.schema.createTable('domains', t => {
  t.increments('id').primary();
  t.string('domain', 256).unique();
});

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('domains');
