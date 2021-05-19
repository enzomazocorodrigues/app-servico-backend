
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('people_adresses').del()
    .then(function () {
      // Inserts seed entries
      return knex('people_adresses').insert({
        id: 'ece93664-bdb6-4154-85e8-0e8fad1984f8',
        idParent: 'bf7bafe3-5059-4a96-89b2-bc405ea7cd12',
        idType: 62,
        country: 'Brazil',
        zipcode: '05017020',
        city: 'São Paulo',
        district: 'Perdizes',
        address: 'Rua Apiacás',
        number: '961',
        complement: 'Ap 11 ABS',
        default: true
      });
    });
};
