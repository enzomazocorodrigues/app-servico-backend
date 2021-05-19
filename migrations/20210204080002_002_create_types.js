exports.up = function (knex, Promise) {
  return knex.schema.createTable('types', table => {
    table.integer('id').primary().notNull()
    table.integer('idStatus').references('id')
      .inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.string('name', 40).notNull().unique()
    table.string('altName', 40).notNull()
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('types')
};

// truncate table "types";
// select * from "types" order by id asc;