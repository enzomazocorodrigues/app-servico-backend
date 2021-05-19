exports.up = function (knex, Promise) {
  return knex.schema.createTable('people_roles', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id')
      .inTable('people').notNull()
    table.integer('idRole').references('id')
      .inTable('types_items').notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('people_roles')
};

// truncate table "people_roles" restart identity;
// select * from "people_roles" order by id asc;