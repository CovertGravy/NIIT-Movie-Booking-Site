'use strict';

(function () {

  class BookingpageComponent {
    constructor($http) {
      this.$http = $http;
      this.select;
      this.userdata = {};
      this.cinemas = [];
    }


    $onInit() {

      // api call for list of movies in cinemas
      this.$http.get('/api/cinemas').then((response) => {
        this.cinemas = response.data;
        console.log(this.cinemas);
      });

      if (sessionStorage.movie) {
        let a = JSON.parse(sessionStorage.movie);
        this.select = a;
        console.log(this.select);
      }
    }

    log() {
      console.log(this.userdata);

      let index = this.cinemas.findIndex(item => item.movie.title === this.userdata.movie);

      if(index !== -1){
        this.select = this.cinemas[index];
      }
      
      // let index;
      // for(let i=0; i<this.cinemas.length; i++){
      //   if(this.cinemas[i].movie.title === this.userdata.movie){
      //     index = this.cinemas[i];
      //     break;
      //   }
      // }
      

      // this.select = index;

      console.log(index);
      
    }
  }
  angular.module('yeomanAppApp')
    .component('bookingpage', {
      templateUrl: 'app/bookingpage/bookingpage.html',
      controller: BookingpageComponent,
      controllerAs: 'bookingpageCtrl'
    });

})();
