'use strict';

(function () {

  class BookingpageComponent {
    constructor($http) {
      this.$http = $http;
      this.select;
      this.userdata = {
        movie: '',
        state: '',
        city: '',
        location: '',
        date: '',
        time: '',
        tickets: '',
        seats: []
      };
      this.cinemas;
      this.names;
      this.states;
      this.cities;
      this.locations;
      this.dates;
      this.times;
      this.poster;
      this.tickets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      this.seats = [];
      this.reserved;
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

      this.$http.get('/api/tickets').then(response => {
        this.reserved = response.data;
        console.log(this.reserved);
      });

      if (sessionStorage.movie) {
        let a = JSON.parse(sessionStorage.movie);
        this.select = a;
        this.userdata.movie = a.movie.title;
        console.log(this.userdata);
        this.poster = a.movie.poster;
        console.log(this.select);
      }
      // let select = this.seats;
      // $(document).ready(function(){
      //   if($('td').hasClass('seat')){
      //     $('.seat').addClass('available');
      //     $('.reserved').removeClass('available');      
      //   }



      //   if($('td').hasClass('available')){
      //     $('.available').on('click', function(){
      //       if(select.indexOf(this.id) === -1){
      //         select.push(this.id);
      //       }else{
      //         select.splice(select.indexOf(this.id), 1);
      //       }
      //       console.log(select);
      //       $(this).toggleClass('selected available'); 
      //     });
      //   }

      // });

    }


    getPoster() {
      let poster = '';
      for (let i = 0; i < this.cinemas.length; i++) {
        if (this.userdata.movie === this.cinemas[i].movie.title) {
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

          if (poster === '') {
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
      console.log(this.seats);
    }

    proceed() {
      let data = true;
      let missing = [];
      for (let prop in this.userdata) {
        let value = this.userdata[prop];

        if (value === '') {
          data = false;
          missing.push(prop);
        } else {
          console.log(value);
        }

      }

      console.log(missing);
      if(data) {

        let reserveSeats = [];
        let datauser = this.userdata;
        let ticketBooked = this.reserved;
        // for(let i=0; i<this.reserved.length; i++){
        //   if(this.reserved[i].movie === this.userdata.movie){

        //     }
        //   }

        ticketBooked.forEach(function (ticket) {
          let count = 0;
          for (let prop in datauser) {
            if (prop !== 'tickets' && prop !== 'seats' && ticket[prop] === datauser[prop]) {
              count++;
            }
          }
          console.log(count);
          if(count === 6){
            ticket.seats.forEach(function(t){
              reserveSeats.push(t);
            });
          }
        });
      
        console.log(reserveSeats);

        //-----------------------------------------------------------------


        let select = this.seats;
        $(document).ready(function() {

          if ($('td').hasClass('seat')) {
            $('.seat').addClass('available');
            // $('.reserved').removeClass('available');
          }

          if($('td').hasClass('seat')){
            $('.seat').each(function(){
              if($(this).hasClass('reserved')){
                $(this).removeClass('reserved'); 
                // $(this).removeClass('available');
                $(this).removeClass('selected');               
              }
              if($(this).hasClass('selected')){
                $(this).removeClass('selected');  
              }
              if(reserveSeats.indexOf(this.id) !== -1){
                $(this).addClass('reserved');
                if($(this).hasClass('available')){
                  $(this).removeClass('available');
                }   
                if($(this).hasClass('selected')){
                  $(this).removeClass('selected');
                }
              }
            });
          }

          

          let count=0;

          // off() prevented multiple onclick event firing.
          
            $('.available').off().on('click', function () {
              console.log("totla count"+(count++));
              if (select.indexOf(this.id) === -1) {
                
                
                console.log(select.indexOf(this.id)); 
                select.push(this.id);
                $(this).toggleClass('selected available');
              } else {
               // select.pop();
               select.splice(select.indexOf(this.id), 1);
               $(this).toggleClass('selected available');
               
              }
              console.log(select);
             
            });
          

        });
        $("#seatselect").modal('show');


//---------------------------------------------------------------------------
       
      }else {
        alert(`Please select ${missing}`);
      }


    }
  
    
  reset(){
    this.seats.length=0;
 }
  


  getSeats(){
    if (this.seats[0] !== undefined && this.seats.length == this.userdata.tickets) {
      this.userdata.seats = this.seats;
      sessionStorage.setItem('ticket', JSON.stringify(this.userdata));
      $('#seatselect').modal('hide');
      location.href = '/payment';
    } else if (this.seats.length === 0) {
      alert('Seat not selected!');
    } else {
      alert(`Please select ${this.userdata.tickets} seat(s).`);
    }

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

}) ();
