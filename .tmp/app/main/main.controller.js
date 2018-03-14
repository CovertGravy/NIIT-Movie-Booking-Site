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
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/cinemas').then(function (response) {
          _this.cinemas = response.data;
          console.log(_this.cinemas);
        });
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
