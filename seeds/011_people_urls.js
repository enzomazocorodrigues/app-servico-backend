
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('people_urls').del()
    .then(function () {
      // Inserts seed entries
      return knex('people_urls').insert({
        id: "3fceb877-315f-492d-9152-dffac9bce597",
        idParent: "bf7bafe3-5059-4a96-89b2-bc405ea7cd12",
        idType: 71,
        url: "enzo.rodrigues2@gmail.com",
        verified: true
      });
    });
};
