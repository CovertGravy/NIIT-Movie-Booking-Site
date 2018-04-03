'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var BookedComponent = function () {
    function BookedComponent($http) {
      _classCallCheck(this, BookedComponent);

      this.message = 'Hello';
      this.$http = $http;
      this.booked;
      this.id;
      this.movies = [];
      this.movie;
    }

    _createClass(BookedComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.booked = JSON.parse(sessionStorage.booked);
        console.log(this.booked);

        var id = Math.random().toString().slice(2, 11);
        console.log(id);
        this.id = id;

        this.$http.get('/api/movies').then(function (response) {
          _this.movies = response.data;
          console.log(_this.movies);
          _this.movies.forEach(function (movie) {
            for (var prop in movie) {
              if (prop === 'Title' && movie[prop] === _this.booked.movie) {
                _this.movie = movie;
                break;
              }
            }
          });
          console.log(_this.movie);
        });
      }
    }]);

    return BookedComponent;
  }();

  angular.module('yeomanAppApp').component('booked', {
    templateUrl: 'app/booked/booked.html',
    controller: BookedComponent,
    controllerAs: 'bookedCtrl'
  });
})();
//# sourceMappingURL=booked.controller.js.map
