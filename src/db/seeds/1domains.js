exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('domains').del()
    .then(function () {
      // Inserts seed entries
      return knex('domains').insert([
        {domain: 'example.com'},
        {domain: 'my.dom'}
      ]);
    });
};
