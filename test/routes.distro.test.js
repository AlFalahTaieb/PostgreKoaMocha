process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaitHttp = require('chai-http')

chai.use(chaitHttp)

const server = require('../src/index')
const knex = require('../src/server/db/connection')

describe('routes : distro', () => {
    beforeEach(() => {
        return knex.migrate.rollback()
            .then(() => { return knex.migrate.latest })
            .then(() => { return knex.seed.run })
    })
    afterEach(()=>{
        return knex.migrate.rollback()
    })
})
