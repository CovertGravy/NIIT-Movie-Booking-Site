'use strict';

// particlesJS.load('particles-js', 'particles.json', function() {
//   console.log('callback - particles.js config loaded');
// });

angular.module('yeomanAppApp', ['yeomanAppApp.auth', 'yeomanAppApp.admin', 'yeomanAppApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'btford.socket-io', 'validation.match']).config(function ($routeProvider, $locationProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map
