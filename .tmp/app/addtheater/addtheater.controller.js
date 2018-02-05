'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AddtheaterComponent = function () {
    function AddtheaterComponent($http, socket) {
      _classCallCheck(this, AddtheaterComponent);

      this.message = 'Hello';
      this.$http = $http;
      this.socket = socket;
    }

    _createClass(AddtheaterComponent, [{
      key: '$onInit',
      value: function $onInit() {
        console.log("hello");
        this.showTheater();

        // this.$http.get('/api/things')
        //   .then(response => {
        //     this.awesomeThings = response.data;
        //     this.socket.syncUpdates('thing', this.awesomeThings);
        //   });
      }
    }, {
      key: 'showTheater',
      value: function showTheater() {
        var _this = this;

        console.log('api called');
        this.$http.get('/api/theaters').then(function (response) {
          _this.TheaterList = response.data;
          console.log(_this.TheaterList);
          _this.socket.syncUpdates('theater', _this.TheaterList);
        });
      }
    }, {
      key: 'addTheater',
      value: function addTheater() {
        if (this.theater.name && this.theater.location && this.theater.city) {
          this.$http.post('/api/theaters', {
            Name: this.theater.name,
            Location: this.theater.location,
            City: this.theater.city
          }).then(function (response) {
            alert('Theater added successfully');
          });
          this.theater = '';
        } else {
          alert('Fields empty.');
        }
      }
    }, {
      key: 'deleteTheater',
      value: function deleteTheater(id) {
        if (confirm("Click OK to confirm deletion or Cancel to abort.")) {
          this.$http.delete('/api/theaters/' + id).then(function (response) {
            alert('Theater Deleted Successfully!');
          });
        } else {
          alert('Action aborted');
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
