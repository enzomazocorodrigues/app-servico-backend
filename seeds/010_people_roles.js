exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('people_roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('people_roles').insert({
        id: '343d2b96-01a7-4486-a4e7-6e574be2bca8',
        idParent: 'bf7bafe3-5059-4a96-89b2-bc405ea7cd12',
        idRole: 21
      });
    });
};
