'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cinemaCtrlStub = {
  index: 'cinemaCtrl.index',
  show: 'cinemaCtrl.show',
  create: 'cinemaCtrl.create',
  update: 'cinemaCtrl.update',
  destroy: 'cinemaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cinemaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cinema.controller': cinemaCtrlStub
});

describe('Cinema API Router:', function() {

  it('should return an express router instance', function() {
    expect(cinemaIndex).to.equal(routerStub);
  });

  describe('GET /api/cinemas', function() {

    it('should route to cinema.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'cinemaCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/cinemas/:id', function() {

    it('should route to cinema.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'cinemaCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/cinemas', function() {

    it('should route to cinema.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'cinemaCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/cinemas/:id', function() {

    it('should route to cinema.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'cinemaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cinemas/:id', function() {

    it('should route to cinema.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'cinemaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cinemas/:id', function() {

    it('should route to cinema.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'cinemaCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
