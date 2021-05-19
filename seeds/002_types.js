
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        { id: 1, idStatus: 2, susp: false, name: "idEvent", altName: "event" },
        { id: 2, idStatus: 2, susp: false, name: "idRole", altName: "role" },
        { id: 3, idStatus: 2, susp: false, name: "idTypePerson", altName: "type of person" },
        { id: 4, idStatus: 2, susp: false, name: "idGender", altName: "gender" },
        { id: 5, idStatus: 2, susp: false, name: "idTypeDocument", altName: "type of document" },
        { id: 6, idStatus: 2, susp: false, name: "idTypeTelephone", altName: "type of telephone" },
        { id: 7, idStatus: 2, susp: false, name: "idTypeUrl", altName: "type of url" },
        { id: 8, idStatus: 2, susp: false, name: "idMesureUnit", altName: "mesure unit" },
        { id: 9, idStatus: 2, susp: false, name: "idTypeOrder", altName: "type of order" },
        { id: 10, idStatus: 2, susp: false, name: "idPaymentMethod", altName: "forma de pagamento" },
        { id: 11, idStatus: 2, susp: false, name: "idTypeTransaction", altName: "type of transaction" },
    ]);
  });
};
