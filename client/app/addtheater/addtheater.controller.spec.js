'use strict';

describe('Component: AddtheaterComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanAppApp'));

  var AddtheaterComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    AddtheaterComponent = $componentController('addtheater', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
