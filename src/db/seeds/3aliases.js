exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('aliases').del()
    .then(function () {
      // Inserts seed entries
      return knex('aliases').insert([
        {src_usr: 'miller', src_dom: 'example.com', dst_usr: 'm_alias', dst_dom: 'other.com', enabled: true},
        {src_usr: 'smith', src_dom: 'example.com', dst_usr: 's_alias', dst_dom: 'other.com', enabled: false},
        {src_usr: 'baker', src_dom: 'example.com', dst_usr: 'b_alias', dst_dom: 'other.com'}
        ]);
    });
};
