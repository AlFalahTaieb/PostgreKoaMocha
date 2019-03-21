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

updateDistro=(id,distro)=>{
  return knex('dist')
  .update(distro)
  .where({id:parseInt(id)}) // changer le String en entier
  .returning('*')
}

deleteDistro=(id)=>{
  return knex('dist')
  .del()
  .where({id:parseInt(id)}) // changer le String en entier
  .returning('*')
}

module.exports = {
  getAllDistros,
  getSingleDistro,
  addDistro,
  updateDistro,
  deleteDistro
}