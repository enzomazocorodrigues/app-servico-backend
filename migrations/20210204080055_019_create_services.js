exports.up = function (knex, Promise) {
  return knex.schema.createTable('services', table => {
    table.uuid('id').primary().notNull()
    table.integer('idStatus').references('id').inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.uuid('idPerson').references('id').inTable('people').notNull()
    table.string('description', 50).notNull()
    table.uuid('category').references('id').inTable('people').notNull()
    table.text('arguments')
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('services')
};

// truncate table "services" restart identity;
// select * from "services" order by id asc;