const knex = require('../connection')


function getAllDistros() {
    return knex('dist')
    .select('*');
  }
  

module.exports = {
getAllDistros


}