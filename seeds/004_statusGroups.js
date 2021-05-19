
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statusGroups').del()
    .then(function () {
      // Inserts seed entries
      return knex('statusGroups').insert([
        { id: 1, idStatus: 2, name: "sgDefault" },
        { id: 2, idStatus: 2, name: "sgPerson" },
        { id: 3, idStatus: 2, name: "sgProduct" },
        { id: 4, idStatus: 2, name: "sgOrder" },
        { id: 5, idStatus: 2, name: "sgTransaction" }
      ]);
    });
};
