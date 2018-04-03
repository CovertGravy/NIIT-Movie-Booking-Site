'use strict';

var app = require('../..');
import request from 'supertest';

var newTicket;

describe('Ticket API:', function() {

  describe('GET /api/tickets', function() {
    var tickets;

    beforeEach(function(done) {
      request(app)
        .get('/api/tickets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tickets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(tickets).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/tickets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tickets')
        .send({
          name: 'New Ticket',
          info: 'This is the brand new ticket!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTicket = res.body;
          done();
        });
    });

    it('should respond with the newly created ticket', function() {
      expect(newTicket.name).to.equal('New Ticket');
      expect(newTicket.info).to.equal('This is the brand new ticket!!!');
    });

  });

  describe('GET /api/tickets/:id', function() {
    var ticket;

    beforeEach(function(done) {
      request(app)
        .get('/api/tickets/' + newTicket._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ticket = res.body;
          done();
        });
    });

    afterEach(function() {
      ticket = {};
    });

    it('should respond with the requested ticket', function() {
      expect(ticket.name).to.equal('New Ticket');
      expect(ticket.info).to.equal('This is the brand new ticket!!!');
    });

  });

  describe('PUT /api/tickets/:id', function() {
    var updatedTicket;

    beforeEach(function(done) {
      request(app)
        .put('/api/tickets/' + newTicket._id)
        .send({
          name: 'Updated Ticket',
          info: 'This is the updated ticket!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTicket = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTicket = {};
    });

    it('should respond with the updated ticket', function() {
      expect(updatedTicket.name).to.equal('Updated Ticket');
      expect(updatedTicket.info).to.equal('This is the updated ticket!!!');
    });

  });

  describe('DELETE /api/tickets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tickets/' + newTicket._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ticket does not exist', function(done) {
      request(app)
        .delete('/api/tickets/' + newTicket._id)
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
