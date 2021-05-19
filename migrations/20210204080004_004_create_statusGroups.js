exports.up = function (knex, Promise) {
  return knex.schema.createTable('statusGroups', table => {
    table.integer('id').primary().notNull()
    table.integer('idStatus').references('id')
      .inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('name', 25).notNull()
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('statusGroups')
};

// truncate table "statusGroups";
// select * from "statusGroups" order by id asc;