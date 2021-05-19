exports.up = function (knex, Promise) {
  return knex.schema.createTable('people_documents', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id')
      .inTable('people').notNull()
    table.integer('idType').references('id')
      .inTable('types_items').notNull()
    table.string('number', 20).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('people_documents')
};

// truncate table "people_documents" restart identity;
// select * from "people_documents" order by id asc;