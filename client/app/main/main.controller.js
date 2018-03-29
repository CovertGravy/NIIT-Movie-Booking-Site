'use strict';

(function () {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.cinemas = [];

    }

    $onInit() {

      this.$http.get('/api/cinemas').then((response) => {
        this.cinemas = response.data;
        console.log(this.cinemas);
      });
    }

    book(movie)
    {
      console.log(movie);
      sessionStorage.setItem("movie",JSON.stringify(movie));
      location.href="/bookingpage";

    }



  }

  angular.module('yeomanAppApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'mainCtrl'
    });
})();
