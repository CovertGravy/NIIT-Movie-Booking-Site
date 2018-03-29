'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var BookingpageComponent = function () {
    function BookingpageComponent($http) {
      _classCallCheck(this, BookingpageComponent);

      this.$http = $http;
      this.select;
      this.userdata = {};
      this.cinemas = [];
    }

    _createClass(BookingpageComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        // api call for list of movies in cinemas
        this.$http.get('/api/cinemas').then(function (response) {
          _this.cinemas = response.data;
          console.log(_this.cinemas);
        });

        if (sessionStorage.movie) {
          var a = JSON.parse(sessionStorage.movie);
          this.select = a;
          console.log(this.select);
        }
      }
    }, {
      key: 'log',
      value: function log() {
        var _this2 = this;

        console.log(this.userdata);

        var index = this.cinemas.findIndex(function (item) {
          return item.movie.title === _this2.userdata.movie;
        });

        if (index !== -1) {
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
