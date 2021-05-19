exports.up = function (knex, Promise) {
  return knex.schema.createTable('people_urls', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id')
      .inTable('people').notNull()
    table.integer('idType').references('id')
      .inTable('types_items').notNull()
    table.string('url', 80).notNull()
    table.boolean('verified').defaultTo(false).notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('people_urls')
};

// truncate table "people_urls" restart identity;
// select * from "people_urls" order by id asc;