exports.up = function (knex, Promise) {
  return knex.schema.createTable('people', table => {
    table.uuid('id').primary().notNull()
    table.integer('idStatus').references('id').inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.integer('idType').references('id').inTable('types_items').notNull()
    table.string('name', 40).notNull()
    table.string('altName', 25)
    table.date('birthDate')
    table.integer('idGender').references('id').inTable('types_items')
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('people')
};

// truncate table "people" restart identity;
// select * from "people" order by id asc;