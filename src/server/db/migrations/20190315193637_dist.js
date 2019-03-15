
exports.up = (knex, Promise) => {
    return knex.schema.createTable('dist', (table) => {
        table.increments()
        table.string('name').notNullable().unique()
        table.string('basedOn').notNullable()
        table.float('rating').notNullable()
        table.boolean('explicit').notNullable()
    })
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('dist')
};
