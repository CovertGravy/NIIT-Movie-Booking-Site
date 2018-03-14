'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AddmovieComponent = function () {
    function AddmovieComponent($http, $scope, socket) {
      _classCallCheck(this, AddmovieComponent);

      this.$http = $http;
      this.$scope = $scope;
      this.socket = socket;
      this.MovieData = {};
      this.MovieList = [];
      //this.showMovie();
    }
    //console.log("thisis "+this.MovieList);

    _createClass(AddmovieComponent, [{
      key: '$onInit',
      value: function $onInit() {
        console.log("hello");
        this.showMovie();

        // this.$http.get('/api/things')
        //   .then(response => {
        //     this.awesomeThings = response.data;
        //     this.socket.syncUpdates('thing', this.awesomeThings);
        //   });
      }
    }, {
      key: 'showMovie',
      value: function showMovie() {
        var _this = this;

        console.log('api called');
        this.$http.get('/api/Movies').then(function (response) {
          _this.MovieList = response.data;
          console.log(_this.MovieList);
          _this.socket.syncUpdates('Movie', _this.MovieList);
        });
      }
    }, {
      key: 'SearchMovie',
      value: function SearchMovie() {
        var _this2 = this;

        var a = this.MovieName;
        var b = this.MovieYear;
        console.log("value of a is " + a);
        if (a == undefined || a == '') {
          alert('Movie name required!!');
        } else {
          this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=536b243c9c6c280a37f5047a1612242f&query=' + a + '&year=' + b).then(function (response) {
            var MovieID = response.data.results[0].id;
            _this2.$http.get('https://api.themoviedb.org/3/movie/' + MovieID + '?api_key=536b243c9c6c280a37f5047a1612242f').then(function (response) {
              console.log(response.data);
              _this2.MovieData = response.data;
            });
            //console.log(response.data.results[0]);
          });
        }
      }

      //showMovie();

    }, {
      key: 'addMovie',
      value: function addMovie() {
        var _this3 = this;

        this.$http.post('/api/Movies', this.MovieData).then(function (response) {
          console.log(response);
          if (response.data.code == 11000) {
            alert('Movie [' + _this3.MovieData.title + '] is already in Database.');
          } else {
            alert('Movie [' + _this3.MovieData.title + '] added successfully.');
            _this3.MovieData = {};
            _this3.MovieName = "";
          }
        });
      }
    }, {
      key: 'deleteMovie',
      value: function deleteMovie(id) {
        if (confirm("Click OK to confirm deletion or Cancel to abort.")) {
          this.$http.delete('/api/Movies/' + id).then(function (response) {
            alert('Movie Deleted Successfully!');
          });
        } else {
          alert('Action aborted');
        }
      }
    }]);

    return AddmovieComponent;
  }();

  angular.module('yeomanAppApp').component('addmovie', {
    templateUrl: 'app/addmovie/addmovie.html',
    controller: AddmovieComponent,
    controllerAs: 'addmovieCtrl'
  });
})();
//# sourceMappingURL=addmovie.controller.js.map
