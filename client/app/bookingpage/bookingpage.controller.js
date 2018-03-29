'use strict';

(function () {

  class BookingpageComponent {
    constructor($http) {
      this.$http = $http;
      this.select;
      this.userdata = {};
      this.cinemas;
      this.names;
      this.states;
      this.cities;
      this.locations;
      this.dates;
      this.times;
      this.poster;
      this.tickets = [1,2,3,4,5,6,7,8,9,10];
    }


    $onInit() {

      // api call for list of movies in cinemas
      this.$http.get('/api/cinemas').then((response) => {
        this.cinemas = response.data;

        let names = [];
        this.cinemas.forEach(element => {
          if (names.indexOf(element.movie.title) === -1) {
            names.push(element.movie.title);
          }
        });
        this.names = names;
        console.log(this.cinemas);
        console.log(this.names);
      });

      if (sessionStorage.movie) {
        let a = JSON.parse(sessionStorage.movie);
        this.select = a;
        this.userdata.movie = a.movie.title;
        this.poster = a.movie.poster;
        console.log(this.select);
      }

      

    }

    getPoster(){
      let poster = '';
      for(let i=0; i<this.cinemas.length; i++){
        if(this.userdata.movie === this.cinemas[i].movie.title){
          poster = this.cinemas[i].movie.poster;
          break;
        }
      }

      this.poster = poster;
    }

    getState() {
      let states = [];
      let cities = {};
      let locations = {};
      let dates = {};
      let times = {};
      let poster = '';

      for (let i = 0; i < this.cinemas.length; i++) {
        if (this.cinemas[i].movie.title === this.userdata.movie) {

          if(poster === ''){
            poster = this.cinemas[i].movie.poster;
          }

          if (states.indexOf(this.cinemas[i].movie.theaters.state) === -1) {
            states.push(this.cinemas[i].movie.theaters.state);
          }

          if (cities[this.cinemas[i].movie.theaters.state]) {
            if (cities[this.cinemas[i].movie.theaters.state].indexOf(this.cinemas[i].movie.theaters.city) === -1) {
              cities[this.cinemas[i].movie.theaters.state].push(this.cinemas[i].movie.theaters.city);
            }
          } else {
            cities[this.cinemas[i].movie.theaters.state] = [this.cinemas[i].movie.theaters.city];
          }

          if (locations[this.cinemas[i].movie.theaters.city]) {
            if (locations[this.cinemas[i].movie.theaters.city].indexOf(this.cinemas[i].movie.theaters.location) === -1) {
              locations[this.cinemas[i].movie.theaters.city].push(this.cinemas[i].movie.theaters.location);
            }
          } else {
            locations[this.cinemas[i].movie.theaters.city] = [this.cinemas[i].movie.theaters.location];
          }

          if (dates[this.cinemas[i].movie.theaters.location]) {
            dates[this.cinemas[i].movie.theaters.location].push(this.cinemas[i].movie.theaters.dates);
          } else {
            dates[this.cinemas[i].movie.theaters.location] = this.cinemas[i].movie.theaters.dates;
          }

          if (times[this.cinemas[i].movie.theaters.location]) {
            times[this.cinemas[i].movie.theaters.location].push(this.cinemas[i].movie.theaters.time);
          } else {
            times[this.cinemas[i].movie.theaters.location] = this.cinemas[i].movie.theaters.time;
          }
        }
      }

      // this.cinemas.forEach(element => {
      //   if(element.movie.title === this.userdata.movie){
      //     states.push(element.movie.theaters.state);
      //   }
      // });
      this.states = states;
      this.cities = cities;
      this.locations = locations;
      this.dates = dates;
      this.times = times;
      this.poster = poster;
      console.log(this.states);
      console.log(this.cities);
      console.log(this.locations);
      console.log(this.dates);
      console.log(this.times);
      console.log(this.poster);
      console.log(this.userdata);
    }

    log() {
      console.log(this.userdata);

      let index = this.cinemas.findIndex(item => item.movie.title === this.userdata.movie);

      // if(index !== -1){
      //   this.select = this.cinemas[index];
      // }

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
