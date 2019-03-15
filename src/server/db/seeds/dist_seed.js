
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('dist').del()
    .then(() => {
      // Inserts seed entries
      return knex('dist').insert(
        {
          name: 'Ubuntu',
          basedOn: 'Debian',
          rating: 7.3,
          explicit: false
        }
      )
    }).then(() => {
      return knex('dist').insert(
        {
          name: 'Solus',
          basedOn: 'Debian/Ubuntu',
          rating: 8.3,
          explicit: true
        }
      )
    }).then(() => {
      return knex('dist').insert(
        {
          name: 'Manjaro',
          basedOn: 'Arch',
          rating: 8.6,
          explicit: false
        }
      )
    })
}
