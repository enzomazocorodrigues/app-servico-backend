const bcryptjs = require('bcryptjs')

const encryptPassword = password => {
  const salt = bcryptjs.genSaltSync(10)
  return bcryptjs.hashSync(password, salt)
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('people_passwords').del()
    .then(function () {
      // Inserts seed entries
      return knex('people_passwords').insert({
        id: "e0d841ed-5a57-4783-915f-95bff0148a5c",
        idParent: "bf7bafe3-5059-4a96-89b2-bc405ea7cd12",
        date: new Date().toISOString(),
        password: encryptPassword("enzo1234")
      });
    });
};
