'use strict';

angular.module('yeomanAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookingpage', {
        template: '<bookingpage></bookingpage>'
      });
  });
