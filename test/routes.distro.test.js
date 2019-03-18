process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)


const server = require('../src/server/index')
const knex = require('../src/server/db/connection')
const request = chai.request(server).keepOpen()


describe('routes : dist', () => {
    beforeEach(() => {
        return knex.migrate.rollback()
            .then(() => { return knex.migrate.latest })
            .then(() => { return knex.seed.run })
    })
    afterEach(()=>{
        return knex.migrate.rollback()
    })
})


// beforeEach is fired before any of tests specs 


describe('GET /dist', () => {
    it('should return all distros', (done) => {
      request
      .get('/dist')
      .end((err, res) => {

        should.not.exist(err)
        console.log(res.status)
        res.status.should.equal(200)

        res.type.should.equal('application/json')

        res.body.status.should.eql('success')

        res.body.data.length.should.eql(3)


        res.body.data[0].should.include.keys(
          'id', 'name', 'basedOn', 'rating', 'explicit'
        )
        done()
      })
    })
  })

    