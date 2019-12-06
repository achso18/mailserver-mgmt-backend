exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        {username: 'miller', domain: 'example.com', password: 'password', enabled: true},
        {username: 'smith', domain: 'example.com', password: 'password', enabled: true},
        {username: 'baker', domain: 'example.com', password: 'password', enabled: true}
      ]);
    });
};
