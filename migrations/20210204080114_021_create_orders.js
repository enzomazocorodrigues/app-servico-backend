exports.up = function (knex, Promise) {
  return knex.schema.createTable('orders', table => {
    table.uuid('id').primary().notNull()
    table.integer('idStatus').references('id').inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.integer('idType').references('id').inTable('types_items').notNull()
    table.datetime('date').notNull()
    table.uuid('idSeller').references('id').inTable('people').notNull()
    table.uuid('idCustomer').references('id').inTable('people').notNull()
    table.decimal('valorTotal', 11, 2).defaultTo(0).notNull()
    table.integer('idFormaPagamento').references('id').inTable('types_items').notNull()
    table.datetime('dateDelivery')
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('orders')
};

// truncate table "orders" restart identity;
// select * from "orders" order by id asc;