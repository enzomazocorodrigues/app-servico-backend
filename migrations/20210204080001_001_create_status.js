exports.up = function (knex, Promise) {
  return knex.schema.createTable('status', table => {
    table.integer('id').primary().notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('name', 25).notNull().unique()
    table.string('action', 25).notNull()
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('status')
};

// truncate table "status";
// select * from "status" order by id asc;