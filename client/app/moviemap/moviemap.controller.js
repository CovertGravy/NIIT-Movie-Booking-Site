'use strict';

(function(){

class MoviemapComponent {
  constructor($http) {
    this.message = 'Hello';
    this.movie = [];
    this.theater = [];
    this.$http = $http;
  }

  $onInit(){
    this.$http.get('/api/Movies').then((response) => {
      this.movie = response.data;
      console.log(this.movie);
  });

  this.$http.get('/api/theaters').then((response) => {
    this.theater = response.data;
    console.log(this.theater);
  });
}
}

angular.module('yeomanAppApp')
  .component('moviemap', {
    templateUrl: 'app/moviemap/moviemap.html',
    controller: MoviemapComponent,
    controllerAs: 'moviemapCtrl'
  });

})();
