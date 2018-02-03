'use strict';

(function(){

class AddtheaterComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('yeomanAppApp')
  .component('addtheater', {
    templateUrl: 'app/addtheater/addtheater.html',
    controller: AddtheaterComponent,
    controllerAs: 'addtheaterCtrl'
  });

})();
