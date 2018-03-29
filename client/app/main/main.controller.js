'use strict';

(function () {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.cinemas = [];
      this.display = [];

    }

    $onInit() {

      this.$http.get('/api/cinemas').then((response) => {
        this.cinemas = response.data;
        console.log(this.cinemas);

        let display =[];
        for(let i=0; i<this.cinemas.length; i++){
          let title = this.cinemas[i].movie.title;
          let duplicate = false;          
          if(i > 0){
            for(let j=i-1; j>=0; j--){
              if(title === this.cinemas[j].movie.title){
                duplicate = true;
              }
            }
          }
          if(!duplicate){
            display.push(this.cinemas[i]);
          }
        }

        this.display = display;
        console.log(this.display);
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
