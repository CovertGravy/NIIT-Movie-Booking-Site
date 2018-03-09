'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MoviemapComponent = function () {
    function MoviemapComponent($http, socket, $scope) {
      _classCallCheck(this, MoviemapComponent);

      this.message = 'Hello';
      this.$scope = $scope;
      this.socket = socket;
      this.cinemas = [];
      this.movie = [];
      this.theater = [];
      this.city = [];
      this.$http = $http;
      this.dates = [];
      this.hour = [];
      this.min = [];
      this.timings = [];
      this.data = {};
      this.poster;
    }

    _createClass(MoviemapComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        // $("img").error(function(){
        //     $(this).hide();
        // });
        //--------------------------------------------------------------------------------------------------

        // $('#add_time').click(function(){
        //   var hh = $('#hour').val();
        //   var mm = $('#min').val();
        //   var ampm = $('#ampm').val();
        //   var tt = hh+':'+mm+' '+ampm;
        //   console.log(tt);
        //   var i;
        //   for(i=0; i<ttAr.length; i++){
        //     var duplicate = false;
        //     if(tt == ttAr[i]){
        //       duplicate = true;
        //       console.log('duplicate found');
        //     }
        //   }
        //   if(duplicate == true){
        //     alert(tt+' already added');
        //   }else{
        //   // this.timings=tt;
        //     ttAr.push(tt);
        //    // show(ttAr);
        //   //  $scope.aa;
        //     //$scope.aa=tt;
        //   }
        //   console.log(this.timings);

        // });


        //$digest or $apply
        //this.timings=ttAr;


        //-----------------------------------------------------------------------------------------------------------
        this.$http.get('/api/Movies').then(function (response) {
          _this.movie = response.data;
          console.log(_this.movie);
        });

        this.$http.get('/api/theaters').then(function (response) {
          _this.theater = response.data;
          var cities = [];
          for (var i = 0; i < _this.theater.length; i++) {
            if (cities.indexOf(_this.theater[i].City) == -1) {
              cities.push(_this.theater[i].City);
            }
          }
          console.log(_this.theater);
          console.log(cities);
          _this.city = cities;
        });

        this.$http.get('/api/cinemas').then(function (response) {
          _this.cinemas = response.data;
          console.log(_this.cinemas);
          _this.socket.syncUpdates('cinema', _this.cinemas);
        });

        var date = new Date();
        var day = moment(date);
        console.log(day);

        var i;
        for (i = 0; i < 6; i++) {
          this.dates[i] = day.add(1, 'd').format('MMM DD');
        }

        console.log(this.dates);

        var j;
        var h = 1;
        for (j = 0; j < 12; j++) {
          this.hour[j] = h;
          if (this.hour[j] < 10) {
            this.hour[j] = '0' + h;
          }
          h++;
        }

        var l;
        for (l = 0; l < 12; l++) {
          this.min[l] = l * 5;
          if (this.min[l] < 10) {
            this.min[l] = '0' + l * 5;
          }
        }
      }
    }, {
      key: 'savetime',
      value: function savetime() {

        var hh = this.data.h;
        var mm = this.data.m;
        var ampm = this.data.ampm;
        var tt = hh + ':' + mm + ' ' + ampm;
        console.log(tt);

        var i;
        for (i = 0; i < this.timings.length; i++) {
          var duplicate = false;
          if (tt == this.timings[i]) {
            duplicate = true;
            console.log('duplicate found');
          }
        }

        if (duplicate == true) {
          alert(tt + ' already added');
        } else {
          this.timings.push(tt);
        }

        console.log(this.data);
        console.log(this.timings);
      }
    }, {
      key: 'deletetime',
      value: function deletetime(time) {
        var i = this.timings.indexOf(time);
        console.log(time);
        this.timings.splice(i, 1);
        console.log(this.timings);
      }
    }, {
      key: 'deleteCinema',
      value: function deleteCinema(id) {
        if (confirm("Click OK to confirm deletion or Cancel to abort.")) {
          this.$http.delete('/api/cinemas/' + id).then(function (response) {
            alert('Cinema Deleted Successfully!');
          });
        } else {
          alert('Action aborted');
        }
      }
    }, {
      key: 'getPoster',
      value: function getPoster() {
        var _this2 = this;

        var index = this.movie.findIndex(function (item) {
          return item.Title === _this2.data.movieS;
        });
        console.log(index);
        if (index !== -1) {
          this.poster = this.movie[index].Poster;
          console.log(this.poster);
        }
      }
    }, {
      key: 'submit',
      value: function submit() {
        var _this3 = this;

        var datemap = [];
        $('.days:checked').each(function () {
          datemap.push($(this).val());
        });
        if (datemap.length == 0) {
          alert('No date selected');
        }
        console.log(datemap);

        var items = {
          title: this.data.movieS,
          city: this.data.cityS,
          theater: this.data.theaterS,
          dates: datemap,
          times: this.timings
        };
        var valid = true;
        var check = Object.values(items);
        var check1 = Object.keys(items);

        for (var i = 0; i < check.length; i++) {

          if (Array.isArray(check[i])) {
            if (check[i].length == 0) {
              valid = false;
            }
          } else {
            if (check[i] == undefined) {
              valid = false;
            }
          }
        }
        console.log(valid);

        var cinema = this.cinemas;
        var dateCheck = true;
        var timeCheck = true;

        var sameD = [];
        var sameT = [];
        for (var i = 0; i < cinema.length; i++) {

          console.log(cinema[i].movie);
          if (cinema[i].movie.theaters.city == items.city && cinema[i].movie.theaters.name == items.theater) {
            var d1 = cinema[i].movie.theaters.dates;
            var t1 = cinema[i].movie.theaters.time;
            for (var j = 0; j < d1.length; j++) {
              if (items.dates.indexOf(d1[j]) !== -1) {
                console.log('same dates ' + d1[j]);
                dateCheck = false;
                sameD.push(d1[j]);
              }
            }

            if (!dateCheck) {
              for (var k = 0; k < t1.length; k++) {
                if (items.times.indexOf(t1[k]) !== -1) {
                  console.log('same timings ' + t1[k]);
                  timeCheck = false;
                  sameT.push(t1[k]);
                }
              }
            }

            if (!dateCheck && timeCheck) {
              dateCheck = true;
            }
          }
        }

        var samet = [];
        for (var i = 0; i < sameT.length; i++) {
          if (samet.indexOf(sameT[i]) == -1) {
            samet.push(sameT[i]);
          }
        }

        var booked = function booked() {
          if (dateCheck && timeCheck) {
            return true;
          } else if (timeCheck) {
            return true;
          } else if (dateCheck) {
            return true;
          } else {
            return false;
          }
        };

        if (valid && booked()) {
          this.$http.post('/api/cinemas', {
            movie: {
              title: items.title,
              // imdb: this.movie[index].imdb_id,
              theaters: {
                name: items.theater,
                city: items.city,
                dates: items.dates,
                time: items.times
              }

            }
          }).then(function (response) {
            alert('Success!');
            _this3.data.movieS = '';
            _this3.data.theaterS = '';
            _this3.data.cityS = '';
            _this3.poster = '';
            $('.days:checked').each(function () {
              this.checked = false;
            });
            datemap = [];
            _this3.timings = [];
          });
        } else if (!dateCheck && !timeCheck) {
          alert('Theater is booked for [' + sameD + '] on time[' + samet + ']');
        } else {
          alert('Details Missing');
        }
      }

      // datepicker(){
      //   var clicked

      //   console.log(this.clicked);

      //   if(!this.clicked){
      //     console.log('if started');
      //     this.clicked = true;
      //   }else{
      //     console.log('else');
      //     this.clicked = false;
      //   }

      // }

      // $.noConflict();
      // jQuery(document).ready(function($){
      //     $("button").click(function(){
      //         $("p").text("jQuery is still working!");
      //     });
      // });

    }]);

    return MoviemapComponent;
  }();

  angular.module('yeomanAppApp').component('moviemap', {
    templateUrl: 'app/moviemap/moviemap.html',
    controller: MoviemapComponent,
    controllerAs: 'moviemapCtrl'
  });
})();
//# sourceMappingURL=moviemap.controller.js.map
