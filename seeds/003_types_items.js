
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('types_items').insert([
        { id: 0, idStatus: 2, idParent: 1, order: 0, default: false, name: "consultado", altName: "consultar", filter: null, observations: null },
        { id: 1, idStatus: 2, idParent: 1, order: 1, default: false, name: "incluido", altName: "incluir", filter: null, observations: null },
        { id: 2, idStatus: 2, idParent: 1, order: 2, default: false, name: "alterado", altName: "alterar", filter: null, observations: null },
        { id: 3, idStatus: 2, idParent: 1, order: 3, default: false, name: "deletado", altName: "deletar", filter: null, observations: null },
        { id: 4, idStatus: 2, idParent: 1, order: 4, default: false, name: "recuperado", altName: "recuperar", filter: null, observations: null },
        { id: 21, idStatus: 2, idParent: 2, order: 1, default: true, name: "admin", altName: null, filter: null, observations: "Perfil com acesso pleno ao app." },
        { id: 22, idStatus: 2, idParent: 2, order: 2, default: false, name: "financeiro", altName: null, filter: null, observations: "Responsável pelas questões financeiras." },
        { id: 23, idStatus: 2, idParent: 2, order: 3, default: false, name: "logística", altName: null, filter: null, observations: "Responsável pela logística, despacho de pedidos." },
        { id: 24, idStatus: 2, idParent: 2, order: 4, default: false, name: "marketing", altName: null, filter: null, observations: "Responsável pelas publicações de produtos na home." },
        { id: 25, idStatus: 2, idParent: 2, order: 5, default: false, name: "produção", altName: null, filter: null, observations: "Responsável pelo preparo de pedidos." },
        { id: 26, idStatus: 2, idParent: 2, order: 6, default: false, name: "produtos", altName: null, filter: null, observations: "Responsável pelo cadastro de produtos do parceiro." },
        { id: 27, idStatus: 2, idParent: 2, order: 7, default: false, name: "RH", altName: null, filter: null, observations: "Responsável pelo cadastro de colaboradores do parceiro." },
        { id: 28, idStatus: 2, idParent: 2, order: 8, default: false, name: "suporte", altName: null, filter: null, observations: "Responsável pelo atendimento e suporte a clientes do parceiro." },
        { id: 29, idStatus: 2, idParent: 2, order: 9, default: false, name: "vendas", altName: null, filter: null, observations: "Responsável pelas vendas, atndimento de pedidos." },
        { id: 31, idStatus: 2, idParent: 3, order: 1, default: true, name: "física", altName: "F", filter: null, observations: "pessoa física" },
        { id: 32, idStatus: 2, idParent: 3, order: 2, default: false, name: "jurídica", altName: "J", filter: null, observations: "pessoa jurídica" },
        { id: 41, idStatus: 2, idParent: 4, order: 1, default: false, name: "masculino", altName: "M", filter: null, observations: null },
        { id: 42, idStatus: 2, idParent: 4, order: 2, default: false, name: "feminino", altName: "F", filter: null, observations: null },
        { id: 51, idStatus: 2, idParent: 5, order: 1, default: false, name: "cpf", altName: "CPF", filter: "101", observations: null },
        { id: 52, idStatus: 2, idParent: 5, order: 2, default: false, name: "rg", altName: "RG", filter: "101", observations: null },
        { id: 53, idStatus: 2, idParent: 5, order: 3, default: false, name: "cnpj", altName: "CNPJ", filter: "102", observations: null },
        { id: 54, idStatus: 2, idParent: 5, order: 4, default: false, name: "ie", altName: "IE", filter: "102", observations: null },
        { id: 61, idStatus: 2, idParent: 6, order: 1, default: false, name: "celular", altName: "cel", filter: "0", observations: null },
        { id: 62, idStatus: 2, idParent: 6, order: 2, default: false, name: "casa", altName: "casa", filter: "1", observations: null },
        { id: 63, idStatus: 2, idParent: 6, order: 3, default: false, name: "trabalho", altName: "trab", filter: "1", observations: null },
        { id: 69, idStatus: 2, idParent: 6, order: 4, default: false, name: "outro", altName: "outro", filter: "1", observations: null },
        { id: 71, idStatus: 2, idParent: 7, order: 1, default: true, name: "email", altName: "email", filter: null, observations: null },
        { id: 72, idStatus: 2, idParent: 7, order: 2, default: false, name: "site", altName: "site", filter: null, observations: null },
        { id: 81, idStatus: 2, idParent: 8, order: 1, default: false, name: "un", altName: "un", filter: null, observations: null },
        { id: 82, idStatus: 2, idParent: 8, order: 2, default: false, name: "Kg", altName: "Kg", filter: null, observations: null },
        { id: 83, idStatus: 2, idParent: 8, order: 3, default: false, name: "L", altName: "L", filter: null, observations: null },
        { id: 84, idStatus: 2, idParent: 8, order: 4, default: false, name: "m", altName: "m", filter: null, observations: null },
        { id: 91, idStatus: 2, idParent: 9, order: 1, default: false, name: "compra", altName: null, filter: null, observations: "pedido de compra do parceiro" },
        { id: 92, idStatus: 2, idParent: 9, order: 2, default: false, name: "venda", altName: null, filter: null, observations: "pedido de venda do parceiro" },
        { id: 101, idStatus: 2, idParent: 10, order: 1, default: false, name: "dinheiro", altName: "dinheiro", filter: null, observations: null },
        { id: 102, idStatus: 2, idParent: 10, order: 2, default: false, name: "PIX", altName: "PIX", filter: null, observations: null },
        { id: 103, idStatus: 2, idParent: 10, order: 6, default: false, name: "cartão débito", altName: "débito", filter: null, observations: null },
        { id: 104, idStatus: 2, idParent: 10, order: 7, default: false, name: "cartão crédito", altName: "crédito", filter: "|cartao|", observations: null },
        { id: 111, idStatus: 2, idParent: 11, order: 1, default: false, name: "nota de serviço", altName: "nota de serviço", filter: null, observations: "nota fiscal de serviço emitida mensalmente pelo app para o parceiro para discriminar os serviços de intermediação comercial do período" },
        { id: 112, idStatus: 2, idParent: 11, order: 2, default: false, name: "pedido", altName: "pedido", filter: null, observations: "pedido de venda do parceiro" },
        { id: 113, idStatus: 2, idParent: 11, order: 3, default: false, name: "pagamento", altName: "pagamento", filter: null, observations: "pagamento realizado entre app e parceiro para acerto de contas do período" },
      ]);
    });
};
