exports.up = function (knex, Promise) {
  return knex.schema.createTable('transactions', table => {
    table.uuid('id').primary().notNull()
    table.integer('idStatus').references('id').inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.integer('idType').references('id').inTable('types_items').notNull()
    table.datetime('date').notNull()
    table.date('dueDate').notNull()
    table.uuid('idPerson').references('id').inTable('people').notNull()
    table.uuid('idOrder').references('id').inTable('orders')
    table.boolean('onlinePayment').defaultTo(true).notNull()
    table.integer('idPaymentMetod').references('id').inTable('types_items')
    table.string('document', 30)
    table.decimal('value', 11, 2).notNull()
    table.boolean('payment')
    table.boolean('billing')
    table.uuid('idPaymentTransaction').references('id').inTable('transactions')
    table.uuid('idBillingTransaction').references('id').inTable('transactions')
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('transactions')
};

// truncate table "transactions" restart identity;
// select * from "transactions" order by id asc;