const knex = require('../connection')


getAllDistros = () => {
  return knex('dist')
    .select('*');
}
function getSingleDistro(id){
  return knex('dist')
    .select('*')
    .where({ id: parseInt(id) })
}

module.exports = {
  getAllDistros,
  getSingleDistro

}