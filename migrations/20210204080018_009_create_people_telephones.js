exports.up = function (knex, Promise) {
  return knex.schema.createTable('people_telephones', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id')
      .inTable('people').notNull()
    table.integer('idType').references('id')
      .inTable('types_items').notNull()
    table.string('number', 15).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('people_telephones')
};

// truncate table "people_telephones" restart identity;
// select * from "people_telephones" order by id asc;