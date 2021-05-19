
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statusGroups_transitions').del()
    .then(function () {
      // Inserts seed entries
      return knex('statusGroups_transitions').insert([
        { idParent: 1, order: 1, idStatusFrom: 0, idStatusTo: 1, default: true },
        { idParent: 1, order: 2, idStatusFrom: 1, idStatusTo: 0, default: false },
        { idParent: 1, order: 3, idStatusFrom: 1, idStatusTo: 2, default: true },
        { idParent: 1, order: 4, idStatusFrom: 2, idStatusTo: 3, default: true },
        { idParent: 1, order: 5, idStatusFrom: 3, idStatusTo: 2, default: true },
        { idParent: 2, order: 1, idStatusFrom: 0, idStatusTo: 1, default: true },
        { idParent: 2, order: 2, idStatusFrom: 1, idStatusTo: 0, default: false },
        { idParent: 2, order: 3, idStatusFrom: 1, idStatusTo: 2, default: true },
        { idParent: 2, order: 4, idStatusFrom: 2, idStatusTo: 3, default: true },
        { idParent: 2, order: 5, idStatusFrom: 3, idStatusTo: 2, default: true },
        { idParent: 3, order: 1, idStatusFrom: 0, idStatusTo: 1, default: true },
        { idParent: 3, order: 2, idStatusFrom: 1, idStatusTo: 0, default: false },
        { idParent: 3, order: 3, idStatusFrom: 1, idStatusTo: 11, default: false },
        { idParent: 3, order: 4, idStatusFrom: 1, idStatusTo: 2, default: true },
        { idParent: 3, order: 5, idStatusFrom: 11, idStatusTo: 2, default: true },
        { idParent: 3, order: 6, idStatusFrom: 2, idStatusTo: 11, default: false },
        { idParent: 3, order: 7, idStatusFrom: 2, idStatusTo: 12, default: false },
        { idParent: 3, order: 8, idStatusFrom: 2, idStatusTo: 3, default: true },
        { idParent: 3, order: 9, idStatusFrom: 12, idStatusTo: 2, default: false },
        { idParent: 3, order: 10, idStatusFrom: 12, idStatusTo: 3, default: true },
        { idParent: 3, order: 11, idStatusFrom: 3, idStatusTo: 12, default: false },
        { idParent: 4, order: 1, idStatusFrom: 0, idStatusTo: 21, default: true },
        { idParent: 4, order: 3, idStatusFrom: 21, idStatusTo: 0, default: true },
        { idParent: 4, order: 4, idStatusFrom: 21, idStatusTo: 22, default: true },
        { idParent: 4, order: 5, idStatusFrom: 22, idStatusTo: 21, default: true,},
        { idParent: 4, order: 6, idStatusFrom: 22, idStatusTo: 23, default: true, },
        { idParent: 4, order: 7, idStatusFrom: 23, idStatusTo: 22, default: true },
        { idParent: 4, order: 8, idStatusFrom: 23, idStatusTo: 24, default: true },
        { idParent: 4, order: 9, idStatusFrom: 24, idStatusTo: 23, default: true },
        { idParent: 4, order: 10, idStatusFrom: 24, idStatusTo: 25, default: true },
        { idParent: 4, order: 11, idStatusFrom: 25, idStatusTo: 26, default: true },
        { idParent: 5, order: 1, idStatusFrom: 0, idStatusTo: 31, default: true },
        { idParent: 5, order: 2, idStatusFrom: 31, idStatusTo: 0, default: true },
        { idParent: 5, order: 3, idStatusFrom: 31, idStatusTo: 32, default: true },
        { idParent: 5, order: 4, idStatusFrom: 32, idStatusTo: 33, default: true },
        { idParent: 5, order: 5, idStatusFrom: 33, idStatusTo: 32, default: true }
      ]);
    });
};
