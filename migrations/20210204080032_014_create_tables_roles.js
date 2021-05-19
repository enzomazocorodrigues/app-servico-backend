exports.up = function (knex, Promise) {
  return knex.schema.createTable('tables_roles', table => {
    table.uuid('id').primary().notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.integer('idParent').references('id').inTable('tables').notNull()
    table.integer('idEvent').references('id').inTable('types_items')
    table.integer('idRole').references('id').inTable('types_items')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tables_roles')
};

// truncate table "tables_roles" restart identity;
// select * from "tables_roles" order by id asc;