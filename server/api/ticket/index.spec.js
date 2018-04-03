'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ticketCtrlStub = {
  index: 'ticketCtrl.index',
  show: 'ticketCtrl.show',
  create: 'ticketCtrl.create',
  update: 'ticketCtrl.update',
  destroy: 'ticketCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ticketIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ticket.controller': ticketCtrlStub
});

describe('Ticket API Router:', function() {

  it('should return an express router instance', function() {
    expect(ticketIndex).to.equal(routerStub);
  });

  describe('GET /api/tickets', function() {

    it('should route to ticket.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ticketCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/tickets/:id', function() {

    it('should route to ticket.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ticketCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/tickets', function() {

    it('should route to ticket.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ticketCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/tickets/:id', function() {

    it('should route to ticket.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ticketCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tickets/:id', function() {

    it('should route to ticket.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ticketCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tickets/:id', function() {

    it('should route to ticket.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ticketCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
