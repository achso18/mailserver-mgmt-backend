
exports.up = (knex, Promise) => knex.schema.createTable('aliases', t => {
  t.increments('id').primary();
  t.string('src_usr', 64).notNullable();
  t.string('src_dom', 256).notNullable();
  t.string('dst_usr', 64).notNullable();
  t.string('dst_dom', 256).notNullable();
  t.boolean('enabled').defaultTo(false);
  t.unique(['src_usr', 'src_dom', 'dst_usr', 'dst_dom']);
  t.foreign('src_dom').references('domain').inTable('domains');
});

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('aliases');
