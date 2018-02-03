'use strict';

angular.module('yeomanAppApp.auth', ['yeomanAppApp.constants', 'yeomanAppApp.util', 'ngCookies', 'ngRoute']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map
