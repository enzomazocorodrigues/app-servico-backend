exports.up = function (knex, Promise) {
  return knex.schema.createTable('assets', table => {
    table.uuid('id').primary().notNull()
    table.integer('idTable').references('id').inTable('tables').notNull()
    table.uuid('idRegister').notNull()
    table.integer('order').notNull()
    table.string('type', 30)
    table.integer('size')
    table.string('url', 200).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('assets')
};

// truncate table "assets" restart identity;
// select * from "assets" order by id asc;