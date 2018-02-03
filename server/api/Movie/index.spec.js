'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var MovieCtrlStub = {
  index: 'MovieCtrl.index',
  show: 'MovieCtrl.show',
  create: 'MovieCtrl.create',
  update: 'MovieCtrl.update',
  destroy: 'MovieCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var MovieIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './Movie.controller': MovieCtrlStub
});

describe('Movie API Router:', function() {

  it('should return an express router instance', function() {
    expect(MovieIndex).to.equal(routerStub);
  });

  describe('GET /api/Movies', function() {

    it('should route to Movie.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'MovieCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/Movies/:id', function() {

    it('should route to Movie.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'MovieCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/Movies', function() {

    it('should route to Movie.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'MovieCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/Movies/:id', function() {

    it('should route to Movie.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'MovieCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/Movies/:id', function() {

    it('should route to Movie.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'MovieCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/Movies/:id', function() {

    it('should route to Movie.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'MovieCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
