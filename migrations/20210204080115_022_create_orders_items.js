exports.up = function (knex, Promise) {
  return knex.schema.createTable('orders_items', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id').inTable('orders').notNull()
    table.uuid('idProduct').references('id').inTable('products').notNull()
    table.decimal('quantity', 7, 3).notNull()
    table.decimal('price', 11, 3).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('orders_items')
};

// truncate table "orders_items" restart identity;
// select * from "orders_items" order by id asc;