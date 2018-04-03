'use strict';

describe('Component: BookedComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanAppApp'));

  var BookedComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    BookedComponent = $componentController('booked', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
