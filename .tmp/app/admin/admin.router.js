'use strict';

angular.module('yeomanAppApp.admin').config(function ($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
});
//# sourceMappingURL=admin.router.js.map
