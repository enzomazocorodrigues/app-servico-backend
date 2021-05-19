const { v4: uuid } = require('uuid')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        { id: 0, susp: false, name: 'deletado', action: 'deletar' },
        { id: 1, susp: false, name: 'cadastro', action: 'cadastrar' },
        { id: 2, susp: false, name: 'ativo', action: 'ativar' },
        { id: 3, susp: false, name: 'desativo', action: 'desativar' },
        { id: 11, susp: false, name: 'confirmar', action: 'confirmar' },
        { id: 12, susp: false, name: 'confirmado', action: 'confirmado' },
        { id: 13, susp: false, name: 'concluído', action: 'concluir' },
      ]);
    });
};
