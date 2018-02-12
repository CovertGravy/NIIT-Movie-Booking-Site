'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MoviemapComponent = function () {
    function MoviemapComponent($http) {
      _classCallCheck(this, MoviemapComponent);

      this.message = 'Hello';
      this.movie = [];
      this.theater = [];
      this.$http = $http;
      this.dates = [];
    }

    _createClass(MoviemapComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

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
          var x = 1;
          this.dates[i] = day.add(x, 'd').format('MMM DD');
          x++;
        }

        console.log(this.dates);
      }
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
