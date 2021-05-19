exports.up = function (knex, Promise) {
  return knex.schema.createTable('orders_items', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id').inTable('orders').notNull()
    table.uuid('idService').references('id').inTable('services').notNull()
    table.uuid('idEmployee').references('id').inTable('people')
    table.decimal('price', 11, 2).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('orders_items')
};

// truncate table "orders_items" restart identity;
// select * from "orders_items" order by id asc;