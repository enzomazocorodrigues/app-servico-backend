exports.up = function (knex, Promise) {
  return knex.schema.createTable('statusGroups_transitions', table => {
    table.increments('id').primary().notNull()
    table.integer('idParent').references('id').inTable('statusGroups').notNull()
    table.integer('order').notNull()
    table.integer('idStatusFrom').references('id').inTable('status').notNull()
    table.integer('idStatusTo').references('id').inTable('status').notNull()
    table.boolean('default').defaultTo(false).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('statusGroups_transitions')
};

// truncate table "statusGroups_transitions" restart identity;
// select * from "statusGroups_transitions" order by id asc;