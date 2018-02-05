'use strict';

(function(){

class AddtheaterComponent {
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
  }

  addTheater() {
    if (this.theater) {
      this.$http.post('/api/theaters', {
        Name: this.theater.name,
        Location: this.theater.location,
        City: this.theater.city
      });
      this.theater = '';
    }
  }
}

angular.module('yeomanAppApp')
  .component('addtheater', {
    templateUrl: 'app/addtheater/addtheater.html',
    controller: AddtheaterComponent,
    controllerAs: 'addtheaterCtrl'
  });

})();
