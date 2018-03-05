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
      this.movie = [];
      this.theater = [];
      this.$http = $http;
      this.dates = [];
      this.hour = [];
      this.min = [];
      this.timings = [];
      this.data = {};
    }

    _createClass(MoviemapComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        //--------------------------------------------------------------------------------------------------


        $(document).ready(function () {
          $('#add_date').click(function () {
            var datemap = [];
            $('.days:checked').each(function () {
              datemap.push($(this).val());
            });
            if (datemap.length == 0) {
              alert('No date selected');
            }
            console.log(datemap);
          });

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
        });

        //$digest or $apply
        //this.timings=ttAr;


        //-----------------------------------------------------------------------------------------------------------
        this.$http.get('/api/Movies').then(function (response) {
          _this.movie = response.data;
          console.log(_this.movie);
        });

        this.$http.get('/api/theaters').then(function (response) {
          _this.theater = response.data;
          console.log(_this.theater);
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
        this.timings.splice(i, 1);
        console.log(this.timings);
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
