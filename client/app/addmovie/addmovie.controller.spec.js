'use strict';

describe('Component: AddmovieComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanAppApp'));

  var AddmovieComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    AddmovieComponent = $componentController('addmovie', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
