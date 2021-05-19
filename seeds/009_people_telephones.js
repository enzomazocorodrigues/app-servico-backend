
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('people_telephones').del()
    .then(function () {
      // Inserts seed entries
      return knex('people_telephones').insert({
        id: '4d6b6734-7e51-4235-bfeb-f349ef7fad8d',
        idParent: 'bf7bafe3-5059-4a96-89b2-bc405ea7cd12',
        idType: 61,
        number: '5511994529038'
      });
    });
};
