'use strict';

var app = require('../..');
import request from 'supertest';

var newMovie;

describe('Movie API:', function() {

  describe('GET /api/Movies', function() {
    var Movies;

    beforeEach(function(done) {
      request(app)
        .get('/api/Movies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Movies = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(Movies).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/Movies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Movies')
        .send({
          name: 'New Movie',
          info: 'This is the brand new Movie!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMovie = res.body;
          done();
        });
    });

    it('should respond with the newly created Movie', function() {
      expect(newMovie.name).to.equal('New Movie');
      expect(newMovie.info).to.equal('This is the brand new Movie!!!');
    });

  });

  describe('GET /api/Movies/:id', function() {
    var Movie;

    beforeEach(function(done) {
      request(app)
        .get('/api/Movies/' + newMovie._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Movie = res.body;
          done();
        });
    });

    afterEach(function() {
      Movie = {};
    });

    it('should respond with the requested Movie', function() {
      expect(Movie.name).to.equal('New Movie');
      expect(Movie.info).to.equal('This is the brand new Movie!!!');
    });

  });

  describe('PUT /api/Movies/:id', function() {
    var updatedMovie;

    beforeEach(function(done) {
      request(app)
        .put('/api/Movies/' + newMovie._id)
        .send({
          name: 'Updated Movie',
          info: 'This is the updated Movie!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMovie = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMovie = {};
    });

    it('should respond with the updated Movie', function() {
      expect(updatedMovie.name).to.equal('Updated Movie');
      expect(updatedMovie.info).to.equal('This is the updated Movie!!!');
    });

  });

  describe('DELETE /api/Movies/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Movies/' + newMovie._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Movie does not exist', function(done) {
      request(app)
        .delete('/api/Movies/' + newMovie._id)
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
