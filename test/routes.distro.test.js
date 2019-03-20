// process.env.NODE_ENV = 'test';

// const chai = require('chai');
// const should = chai.should();
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);

// const server = require('../src/server/index');
// const knex = require('../src/server/db/connection');

// describe('routes : dist', () => {

//   beforeEach(() => {
//     return knex.migrate.rollback()
//       .then(() => { return knex.migrate.latest() })
//       .then(() => { return knex.seed.run() })
//   });

//   afterEach(() => {
//     return knex.migrate.rollback();
//   });

//   describe('GET /dist', () => {
//     it('should return all distros', (done) => {
//       chai.request(server)
//         .get('/dist')
//         .end((err, res) => {
//           should.not.exist(err)
//           console.log(res.body)
//           // res.status.should.equal(200);

//           // res.type.should.equal('application/json')

//           // res.body.status.should.eql('success')

//           // res.body.data.length.should.eql(3)

//           // res.body.data[0].should.include.keys(
//           //   'id', 'name', 'basedOn', 'rating', 'explicit'
//           // )
//           done();
//         })
//     })
//   })
// })


process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : dist', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET dist', () => {
    it('should return all distros', (done) => {
      chai.request(server)
        .get('/dist')
        .end((err, res) => {

          should.not.exist(err)
          res.status.should.equal(200)

          res.type.should.equal('application/json')

          res.body.status.should.eql('success')

          res.body.data.length.should.eql(3);

          res.body.data[0].should.include.keys(
            'id', 'name', 'basedOn', 'rating', 'explicit'
          )
          done()
        })
    })
  })
})

describe('GET dist/:id ', () => {
  it('should throw an error if the movie does not exist', (done) => {
    chai.request(server)
      .get('/dist/9999999')
      .end((err, res) => {
        should.exist(err)
        res.status.should.equal(404)
        res.type.should.equal('application/json')
        res.body.status.should.eql('error')
        res.body.message.should.eql('That movie does not exist.')
        done()
      })
  })
  it ('should return one distro', (done) => {
    chai.request(server)
      .get('/dist/3')
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.status.should.equal('success')
        res.body.data[0].should.include.keys(
          'id', 'name', 'basedOn', 'rating', 'explicit'
        )
        done()
      })
  });
})