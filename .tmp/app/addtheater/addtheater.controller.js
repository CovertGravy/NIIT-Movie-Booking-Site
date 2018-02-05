'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AddtheaterComponent = function () {
    function AddtheaterComponent($http) {
      _classCallCheck(this, AddtheaterComponent);

      this.message = 'Hello';
      this.$http = $http;
    }

    _createClass(AddtheaterComponent, [{
      key: 'addTheater',
      value: function addTheater() {
        if (this.theater) {
          this.$http.post('/api/theaters', {
            Name: this.theater.name,
            Location: this.theater.location,
            City: this.theater.city
          });
          this.theater = '';
        }
      }
    }]);

    return AddtheaterComponent;
  }();

  angular.module('yeomanAppApp').component('addtheater', {
    templateUrl: 'app/addtheater/addtheater.html',
    controller: AddtheaterComponent,
    controllerAs: 'addtheaterCtrl'
  });
})();
//# sourceMappingURL=addtheater.controller.js.map
