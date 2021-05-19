exports.up = function (knex, Promise) {
  return knex.schema.createTable('logs', table => {
    table.uuid('id').primary().notNull()
    table.datetime('date').notNull()
    table.integer('idTable').references('id').inTable('tables').notNull()
    table.bigInteger('idRegister').notNull()
    table.integer('idEvent').references('id').inTable('types_items').notNull()
    table.uuid('idPerson').references('id').inTable('people').notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('logs')
};

// truncate table "logs" restart identity;
// select * from "logs" order by id asc;