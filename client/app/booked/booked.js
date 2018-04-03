'use strict';

angular.module('yeomanAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/booked', {
        template: '<booked></booked>'
      });
  });
