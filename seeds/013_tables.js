
exports.seed = function(knex) 
{
  // Deletes ALL existing entries
  return knex('tables').del()
    .then(function () 
    {
      // Inserts seed entries
      return knex('tables').insert([
        { id: 1, idStatus: 2, name: "status", alias: "sta", order: 1, idStatusGroup: null, description: "nome", },
        { id: 2, idStatus: 2, name: "types", alias: "typ", order: 1, idStatusGroup: 1, description: "nome", },
        { id: 3, idStatus: 2, name: "types_items", alias: "typ_ite", order: 2, idStatusGroup: 1, description: "nome", key: "idParent" },
        { id: 4, idStatus: 2, name: "statusGroups", alias: "sgs", order: 1, idStatusGroup: 1, description: "nome", },
        { id: 5, idStatus: 2, name: "statusGroups_transitions", alias: "sgs_tran", order: 2, idStatusGroup: null, description: "nome", key: "idParent" },
        { id: 6, idStatus: 2, name: "people", alias: "peo", order: 1, idStatusGroup: 1, description: "nome", },
        { id: 7, idStatus: 2, name: "people_adresses", alias: "peo_adr", order: 2, idStatusGroup: null, description: null, key: "idParent" },
        { id: 8, idStatus: 2, name: "people_documents", alias: "peo_doc", order: 3, idStatusGroup: null, description: null, key: "idParent" },
        { id: 9, idStatus: 2, name: "people_telephones", alias: "peo_tel", order: 4, idStatusGroup: null, description: null, key: "idParent" },
        { id: 10, idStatus: 2, name: "people_roles", alias: "peo_rol", order: 5, idStatusGroup: null, description: null, key: "idParent" },
        { id: 11, idStatus: 2, name: "people_urls", alias: "peo_url", order: 6, idStatusGroup: null, description: null, key: "idParent" },
        { id: 12, idStatus: 2, name: "people_passwords", alias: "peo_pas", order: 7, idStatusGroup: null, description: null, key: "idParent" },
        { id: 13, idStatus: 2, name: "tables", alias: "tabs", order: 1, idStatusGroup: null, description: null },
        { id: 14, idStatus: 2, name: "tables_roles", alias: "tab_rol", order: 2, idStatusGroup: null, description: null, key: "idParent" },
        { id: 15, idStatus: 2, name: "logs", alias: "logs", order: 1, idStatusGroup: null, description: null },
        { id: 16, idStatus: 2, name: "logs_details", alias: "logs_det", order: 2, idStatusGroup: null, description: null, key: "" },
        { id: 17, idStatus: 2, name: "assets", alias: "ass", order: 1, idStatusGroup: null, description: null },
        { id: 18, idStatus: 2, name: "logins", alias: "logn", order: 1, idStatusGroup: null, description: null },
        { id: 19, idStatus: 2, name: "services", alias: "serv", order: 1, idStatusGroup: 1, description: "descricao" },
        { id: 21, idStatus: 2, name: "orders", alias: "ord", order: 1, idStatusGroup: 2, description: null },
        { id: 22, idStatus: 2, name: "orders_items", alias: "ord_ite", order: 2, idStatusGroup: null, description: null, key: "idParent" },
        { id: 23, idStatus: 2, name: "transaction", alias: "tran", order: 1, idStatusGroup: 2, description: null }
      ])
    });
};
