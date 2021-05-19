exports.up = function (knex, Promise) {
  return knex.schema.createTable('products', table => {
    table.uuid('id').primary().notNull()
    table.integer('idStatus').references('id').inTable('status').notNull()
    table.boolean('susp').defaultTo(false).notNull()
    table.uuid('idPerson').references('id').inTable('people').notNull()
    table.string('description', 50).notNull()
    table.string('brand', 25)
    table.string('barcode', 13)
    table.integer('idMeasureUnit').references('id').inTable('types_items').defaultTo(81).notNull()
    table.integer('floatStock').defaultTo(0).notNull()
    table.decimal('stock', 9, 3).defaultTo(1).notNull()
    table.integer('floatPrice').defaultTo(2).notNull()
    table.decimal('cost', 9, 3)
    table.decimal('price', 9, 3).notNull()
    table.decimal('weight', 7, 3)
    table.decimal('volume', 7, 3)
    table.integer('width')
    table.integer('height')
    table.integer('depth')
    table.text('arguments')
    table.text('features')
    table.text('observations')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('products')
};

// truncate table "products" restart identity;
// select * from "products" order by id asc;