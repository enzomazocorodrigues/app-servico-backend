exports.up = function (knex, Promise) {
  return knex.schema.createTable('logs_details', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id').inTable('logs').notNull()
    table.integer('idTable').references('id').inTable('tables').notNull()
    table.bigInteger('idRegister').notNull()
    table.string('column', 30)
    table.text('from')
    table.text('to')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('logs_details')
};

// truncate table "logs_details" restart identity;
// select * from "logs_details" order by id asc;
