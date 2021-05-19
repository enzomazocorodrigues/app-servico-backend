
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('people_documents').del()
    .then(function () {
      // Inserts seed entries
      return knex('people_documents').insert({
        id: '457a3d41-a151-4797-8000-a90163a0ccd6',
        idParent: 'bf7bafe3-5059-4a96-89b2-bc405ea7cd12',
        idType: 51,
        number: '42335197894'
      });
    });
};
