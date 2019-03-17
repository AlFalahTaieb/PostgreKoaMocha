const knex = require('../connection')

getAllDistros=()=>{
return knex('dist')
.select('*')
}


module.exports = {
getAllDistros


}