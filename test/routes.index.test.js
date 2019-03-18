const chai = require('chai')
const should = chai.should()
const chaitHttp = require('chai-http')


chai.use(chaitHttp)

const server = require('../src/server/index')
const request = chai.request(server).keepOpen()


describe('routes : index', ()=>{
    it('should return json',(done) =>{
        request
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
