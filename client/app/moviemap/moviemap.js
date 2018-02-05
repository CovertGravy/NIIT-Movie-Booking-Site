'use strict';

angular.module('yeomanAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviemap', {
        template: '<moviemap></moviemap>'
      });
  });
