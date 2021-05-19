exports.up = function (knex, Promise) {
  return knex.schema.createTable('types_items', table => {
    table.integer('id').primary().notNull()
    table.integer('idParent').references('id').inTable('types').notNull()
    table.integer('idStatus').references('id').inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.integer('order').notNull()
    table.boolean('default').defaultTo(false).notNull()
    table.string('name', 80).notNull()
    table.string('altName', 40)
    table.string('filter', 40)
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('types_items')
};

// truncate table "types_items";
// select * from "types_items" order by id asc;