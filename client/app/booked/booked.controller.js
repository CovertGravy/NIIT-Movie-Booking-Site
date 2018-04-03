'use strict';

(function(){

class BookedComponent {
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
    this.booked;
    this.id;
    this.movies = [];
    this.movie;
  }

  $onInit(){
    
    this.booked = JSON.parse(sessionStorage.booked);
    console.log(this.booked);

    let id= Math.random().toString().slice(2,11);
    console.log(id);
    this.id = id;

    this.$http.get('/api/movies').then(response => {
      this.movies = response.data;
      console.log(this.movies);
      this.movies.forEach(movie => {
        for(let prop in movie){
          if(prop === 'Title' && movie[prop] === this.booked.movie){
            this.movie = movie;
            break;
          }
        }
      });
      console.log(this.movie);
    });

    

    
  }
}



angular.module('yeomanAppApp')
  .component('booked', {
    templateUrl: 'app/booked/booked.html',
    controller: BookedComponent,
    controllerAs: 'bookedCtrl'
  });

})();
