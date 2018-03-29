'use strict';

describe('Component: BookingpageComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanAppApp'));

  var BookingpageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    BookingpageComponent = $componentController('bookingpage', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
