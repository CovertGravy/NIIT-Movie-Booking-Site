'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    function MainController($http, $scope, socket) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.socket = socket;
      this.cinemas = [];
      this.display = [];
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/cinemas').then(function (response) {
          _this.cinemas = response.data;
          console.log(_this.cinemas);

          var display = [];
          for (var i = 0; i < _this.cinemas.length; i++) {
            var title = _this.cinemas[i].movie.title;
            var duplicate = false;
            if (i > 0) {
              for (var j = i - 1; j >= 0; j--) {
                if (title === _this.cinemas[j].movie.title) {
                  duplicate = true;
                }
              }
            }
            if (!duplicate) {
              display.push(_this.cinemas[i]);
            }
          }

          _this.display = display;
          console.log(_this.display);
        });
      }
    }, {
      key: 'book',
      value: function book(movie) {
        console.log(movie);
        sessionStorage.setItem("movie", JSON.stringify(movie));
        location.href = "/bookingpage";
      }
    }]);

    return MainController;
  }();

  angular.module('yeomanAppApp').component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'mainCtrl'
  });
})();
//# sourceMappingURL=main.controller.js.map
