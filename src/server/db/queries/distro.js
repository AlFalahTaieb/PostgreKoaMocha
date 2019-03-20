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

addDistro=(distro)=>{
  return knex('dist')
  .insert(distro)
  .returning('*')
}

module.exports = {
  getAllDistros,
  getSingleDistro,
  addDistro
}