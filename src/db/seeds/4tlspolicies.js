exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tlspolicies').del()
    .then(function () {
      // Inserts seed entries
      return knex('tlspolicies').insert([
        {domain: 'google.com', policy: 'encrypt'},
        {domain: 'my.dom', policy: 'none'},
        {domain: 'microsoft', policy: 'secure'}
      ]);
    });
};
