'use strict';

var app = require('../..');
import request from 'supertest';

var newCinema;

describe('Cinema API:', function() {

  describe('GET /api/cinemas', function() {
    var cinemas;

    beforeEach(function(done) {
      request(app)
        .get('/api/cinemas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cinemas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cinemas).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/cinemas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cinemas')
        .send({
          name: 'New Cinema',
          info: 'This is the brand new cinema!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCinema = res.body;
          done();
        });
    });

    it('should respond with the newly created cinema', function() {
      expect(newCinema.name).to.equal('New Cinema');
      expect(newCinema.info).to.equal('This is the brand new cinema!!!');
    });

  });

  describe('GET /api/cinemas/:id', function() {
    var cinema;

    beforeEach(function(done) {
      request(app)
        .get('/api/cinemas/' + newCinema._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cinema = res.body;
          done();
        });
    });

    afterEach(function() {
      cinema = {};
    });

    it('should respond with the requested cinema', function() {
      expect(cinema.name).to.equal('New Cinema');
      expect(cinema.info).to.equal('This is the brand new cinema!!!');
    });

  });

  describe('PUT /api/cinemas/:id', function() {
    var updatedCinema;

    beforeEach(function(done) {
      request(app)
        .put('/api/cinemas/' + newCinema._id)
        .send({
          name: 'Updated Cinema',
          info: 'This is the updated cinema!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCinema = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCinema = {};
    });

    it('should respond with the updated cinema', function() {
      expect(updatedCinema.name).to.equal('Updated Cinema');
      expect(updatedCinema.info).to.equal('This is the updated cinema!!!');
    });

  });

  describe('DELETE /api/cinemas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cinemas/' + newCinema._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cinema does not exist', function(done) {
      request(app)
        .delete('/api/cinemas/' + newCinema._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
