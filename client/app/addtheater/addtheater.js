'use strict';

angular.module('yeomanAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/addtheater', {
        template: '<addtheater></addtheater>'
      });
  });
