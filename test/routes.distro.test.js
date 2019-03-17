process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaitHttp = require('chai-http')

chai.use(chaitHttp)

const server = require('../src/server/index')
const knex = require('../src/server/db/connection')

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


describe('GET /dist',()=>{
    it('Should return all distros',(done)=>{
        chai.request(server)
        .get('/dist')
        .end((err,res)=>{
            should.not.exist(err)
            res.status.should.equal(200)
            res.type.should.equal('application/json')
            res.body.status.should.eql('success')
            console.log('yoooo',res)
            res.body.data.length.should.eql(3)// base de données contient 3 objets
            res.body.data[0].should.include.keys(
                'id','name','basedOn','rating','explicit'
            )
            done()
        })
    })
})