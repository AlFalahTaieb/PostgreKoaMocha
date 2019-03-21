
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
    // Get All Distro
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
  }),
    describe('GET dist/:id ', () => {
      //Check Valid Distro
      it('should return one distro', (done) => {
        chai.request(server)
          .get('/dist/2')
          .end((err, res) => {
            should.not.exist(err)
            res.status.should.equal(200)

            res.type.should.equal('application/json')

            res.body.status.should.eql('success')
            res.body.data[0].should.include.keys(
              'id', 'name', 'basedOn', 'rating', 'explicit'
            )
            done()
          })
      });
      // Check Wrong Distro

      it(`This doesn't exist`, (done) => {
        chai.request(server)
          .get('/dist/42')
          .end((err, res) => {
            res.status.should.equal(404)
            res.type.should.equal('application/json')
            res.body.status.should.eql('error')
            res.body.message.should.eql(`This distro doesn't exist`)
            done()
          })
      })
    })

  describe('POST /dist', () => {
    it('should return the distro that we added ', (done) => {
      chai.request(server)
        .post('/dist')
        .send({
          name: 'Kali',
          basedOn: 'Debian',
          rating: 8.0,
          explicit: true
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(201)
          res.type.should.equal('application/json')
          res.body.status.should.eql('success')
          res.body.data[0].should.include.keys(
            'id', 'name', 'basedOn', 'rating', 'explicit'
          )
          done()
        })
    }),
      it('should throw an error', (done) => {
        chai.request(server)
          .post('/dist')
          .send({
            name: 'Xubuntu'
          })
          .end((err, res) => {
            res.status.should.equal(400)
            res.type.should.equal('application/json')
            res.body.status.should.eql('error')
            should.exist(res.body.message)
            done()
          })
      })
  })

  describe('PUT /dist', () => {
    it('should update the distro', (done) => {
      knex('dist')
        .select('*')
        .then((distro) => {
          const distObj = distro[0]
          chai.request(server)
            .put(`/dist/${distObj.id}`)
            .send({
              rating: 6.9
            })
            .end((err, res) => {
              should.not.exist(err)
              res.status.should.equal(200)
              res.type.should.equal('application/json')
              res.body.status.should.eql('success')
              res.body.data[0].should.include.keys(
                'id', 'name', 'basedOn', 'rating', 'explicit'
              )
              const newDistroObj = res.body.data[0]
              newDistroObj.rating.should.not.eql(distObj.rating)
              done()
            })
        })
    }),
      it('should throw an error', (done) => {
        chai.request(server)
          .put('/dist/999999')
          .send({
            rating: 9.6
          })
          .end((err, res) => {
            res.status.should.equal(404)
            res.type.should.equal('application/json')
            res.body.status.should.eql('error')
            should.exist(res.body.message)
            done()
          })
      })
  })



})

