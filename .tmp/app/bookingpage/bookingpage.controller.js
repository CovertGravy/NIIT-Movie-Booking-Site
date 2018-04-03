'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var BookingpageComponent = function () {
    function BookingpageComponent($http) {
      _classCallCheck(this, BookingpageComponent);

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

    _createClass(BookingpageComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        // api call for list of movies in cinemas
        this.$http.get('/api/cinemas').then(function (response) {
          _this.cinemas = response.data;

          var names = [];
          _this.cinemas.forEach(function (element) {
            if (names.indexOf(element.movie.title) === -1) {
              names.push(element.movie.title);
            }
          });
          _this.names = names;
          console.log(_this.cinemas);
          console.log(_this.names);
        });

        this.$http.get('/api/tickets').then(function (response) {
          _this.reserved = response.data;
          console.log(_this.reserved);
        });

        if (sessionStorage.movie) {
          var a = JSON.parse(sessionStorage.movie);
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
    }, {
      key: 'getPoster',
      value: function getPoster() {
        var poster = '';
        for (var i = 0; i < this.cinemas.length; i++) {
          if (this.userdata.movie === this.cinemas[i].movie.title) {
            poster = this.cinemas[i].movie.poster;
            break;
          }
        }

        this.poster = poster;
      }
    }, {
      key: 'getState',
      value: function getState() {
        var states = [];
        var cities = {};
        var locations = {};
        var dates = {};
        var times = {};
        var poster = '';

        for (var i = 0; i < this.cinemas.length; i++) {
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
    }, {
      key: 'proceed',
      value: function proceed() {
        var data = true;
        var missing = [];
        for (var prop in this.userdata) {
          var value = this.userdata[prop];

          if (value === '') {
            data = false;
            missing.push(prop);
          } else {
            console.log(value);
          }
        }

        console.log(missing);
        if (data) {

          var reserveSeats = [];
          var datauser = this.userdata;
          var ticketBooked = this.reserved;
          // for(let i=0; i<this.reserved.length; i++){
          //   if(this.reserved[i].movie === this.userdata.movie){

          //     }
          //   }

          ticketBooked.forEach(function (ticket) {
            var count = 0;
            for (var _prop in datauser) {
              if (_prop !== 'tickets' && _prop !== 'seats' && ticket[_prop] === datauser[_prop]) {
                count++;
              }
            }
            console.log(count);
            if (count === 6) {
              ticket.seats.forEach(function (t) {
                reserveSeats.push(t);
              });
            }
          });

          console.log(reserveSeats);

          //-----------------------------------------------------------------


          var select = this.seats;
          $(document).ready(function () {

            if ($('td').hasClass('seat')) {
              $('.seat').addClass('available');
              // $('.reserved').removeClass('available');
            }

            if ($('td').hasClass('seat')) {
              $('.seat').each(function () {
                if ($(this).hasClass('reserved')) {
                  $(this).removeClass('reserved');
                  // $(this).removeClass('available');
                  $(this).removeClass('selected');
                }
                if ($(this).hasClass('selected')) {
                  $(this).removeClass('selected');
                }
                if (reserveSeats.indexOf(this.id) !== -1) {
                  $(this).addClass('reserved');
                  if ($(this).hasClass('available')) {
                    $(this).removeClass('available');
                  }
                  if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                  }
                }
              });
            }

            var count = 0;

            // off() prevented multiple onclick event firing.

            $('.available').off().on('click', function () {
              console.log("totla count" + count++);
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
        } else {
          alert('Please select ' + missing);
        }
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.seats.length = 0;
      }
    }, {
      key: 'getSeats',
      value: function getSeats() {
        if (this.seats[0] !== undefined && this.seats.length == this.userdata.tickets) {
          this.userdata.seats = this.seats;
          sessionStorage.setItem('ticket', JSON.stringify(this.userdata));
          $('#seatselect').modal('hide');
          location.href = '/payment';
        } else if (this.seats.length === 0) {
          alert('Seat not selected!');
        } else {
          alert('Please select ' + this.userdata.tickets + ' seat(s).');
        }

        console.log(this.userdata);
      }
    }, {
      key: 'log',
      value: function log() {
        var _this2 = this;

        console.log(this.userdata);

        var index = this.cinemas.findIndex(function (item) {
          return item.movie.title === _this2.userdata.movie;
        });

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
    }]);

    return BookingpageComponent;
  }();

  angular.module('yeomanAppApp').component('bookingpage', {
    templateUrl: 'app/bookingpage/bookingpage.html',
    controller: BookingpageComponent,
    controllerAs: 'bookingpageCtrl'
  });
})();
//# sourceMappingURL=bookingpage.controller.js.map
