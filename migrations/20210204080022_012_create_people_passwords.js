exports.up = function (knex, Promise) {
  return knex.schema.createTable('people_passwords', table => {
    table.uuid('id').primary().notNull()
    table.uuid('idParent').references('id')
      .inTable('people').notNull()
    table.datetime('date').notNull()
    table.string('password').notNull()
    table.datetime('verifyCodeDate')
    table.string('verifyCode', 6)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('people_passwords')
};

// truncate table "people_passwords" restart identity;
// select * from "people_passwords" order by id asc;