
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('people').del()
    .then(function () {
      // Inserts seed entries
      return knex('people').insert({
        id: 'bf7bafe3-5059-4a96-89b2-bc405ea7cd12',
        idStatus: 2,
        idType: 101,
        name: 'Enzo Mazoco Rodrigues',
        birthDate: '2003-08-15',
        idGender: 41
      });
    });
};
