exports.up = function (knex, Promise) {
  return knex.schema.createTable('people_adresses', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id')
      .inTable('people').notNull()
    table.integer('idType').references('id')
      .inTable('types_items').notNull()
    table.string('country', 30).notNull()
    table.string('zipcode', 9).notNull()
    table.string('city', 30).notNull()
    table.string('district', 30)
    table.string('address', 40).notNull()
    table.string('number', 6)
    table.string('complement', 25)
    table.boolean('default').defaultTo(false).notNull()
    table.decimal('latitude', 9, 7)
    table.decimal('longitude', 10, 7)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('people_adresses')
};

// truncate table "people_adresses" restart identity;
// select * from "people_adresses" order by id asc;