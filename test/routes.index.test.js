const chai = require('chai')
const should = chai.should()
const chaitHttp = require('chai-http')

chai.use(chaitHttp)

const server = require('../src/index')


describe('routes : index', ()=>{
    it('should return json',(done) =>{
        chai.request(server)
        .get('/')
        .end((err,res)=>{
            should.not.exist(err)
            res.status.should.eql('application/json')
            res.type.should.eql('success')
            res.body.message.should.eql('Hi,Taieb')
            done()
        })
    })
})
