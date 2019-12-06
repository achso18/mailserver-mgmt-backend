
exports.up = (knex, Promise) => knex.schema.createTable('accounts', t => {
	  t.increments('id').primary();
    t.string('username', 64).notNullable();
	  t.string('domain', 256).notNullable();
    t.string('password', 256).notNullable();
	  t.integer('quota').defaultTo(0);
	  t.boolean('enabled').defaultTo(false);
	  t.boolean('sendonly').defaultTo(false);
	  t.unique(['username', 'domain']);
	  t.foreign('domain').references('domain').inTable('domains');
  });

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('accounts');
