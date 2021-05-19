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
        { id: 11, susp: false, name: 'lançamento', action: 'lançar' },
        { id: 12, susp: false, name: 'outlet', action: 'outlet' },
        { id: 21, susp: false, name: 'preparo', action: 'preparar' },
        { id: 22, susp: false, name: 'faturamento', action: 'faturar' },
        { id: 23, susp: false, name: 'expedição', action: 'expedir' },
        { id: 24, susp: false, name: 'enviado', action: 'enviar' },
        { id: 25, susp: false, name: 'entregue', action: 'entregar' },
        { id: 26, susp: false, name: 'finalizado', action: 'finalizar' },
        { id: 31, susp: false, name: 'confirmar', action: 'confirmar' },
        { id: 32, susp: false, name: 'confirmado', action: 'confirmado' },
        { id: 33, susp: false, name: 'concluído', action: 'concluir' },
      ]);
    });
};
