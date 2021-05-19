exports.up = function (knex, Promise) {
  return knex.schema.createTable('tables', table => {
    table.integer('id').primary().notNull()
    table.integer('idStatus').references('id').inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('name', 40).notNull()
    table.string('alias', 20).notNull()
    table.integer('order').notNull()
    table.integer('idStatusGroup').references('id').inTable('statusGroups')
    table.string('description', 30)
    table.string('key', 30)
    table.boolean('log').defaultTo(false).notNull()
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tables')
};

// truncate table "tables";
// select * from "tables" order by id asc;