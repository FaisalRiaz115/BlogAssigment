const md5 = require('md5')

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { name: 'Faisal Riaz', email: 'faisal.riaz@gmail.com', password: md5('123456'), },
    { name: 'Joao Vital', email: 'testingemail1@gmail.com', password: md5('123456'), },
    { name: 'Hugh Grant', email: 'testingemail2@gmail.com', password: md5('123456'), }
  ]);
};