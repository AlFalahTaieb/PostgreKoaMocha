const chai = require('chai')
const should = chai.should()
const chaitHttp = require('chai-http')

chai.use(chaitHttp)

const server = require('../src/server/index')


describe('routes : index', ()=>{
    it('should return json',(done) =>{
        chai.request(server)
        .get('/')
        .end((err,res)=>{
            should.not.exist(err)
            res.status.should.eql(200)
            res.type.should.eql('application/json')
            res.body.status.should.eql('success')
            res.body.message.should.eql('Hi,Taieb, This is working')
            done()
        })
    })
})
