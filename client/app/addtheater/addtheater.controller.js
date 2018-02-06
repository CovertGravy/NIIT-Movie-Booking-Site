'use strict';

(function(){

class AddtheaterComponent {
  constructor($http, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket; 
    this.theater = {};
  }

  $onInit() {
    console.log("hello");
    this.showTheater();
    
    // this.$http.get('/api/things')
    //   .then(response => {
    //     this.awesomeThings = response.data;
    //     this.socket.syncUpdates('thing', this.awesomeThings);
    //   });
  }


  showTheater(){
    console.log('api called');
    this.$http.get('/api/theaters').then((response) => {
      this.TheaterList = response.data;
      console.log(this.TheaterList);
      this.socket.syncUpdates('theater', this.TheaterList);
    });
  }

  addTheater() {
    if (this.theater.name && this.theater.location && this.theater.city) {
      this.$http.post('/api/theaters', {
        Name: this.theater.name,
        Location: this.theater.location,
        City: this.theater.city
      })
      .then((response) => {
        alert('Theater added successfully');
      });
      this.theater = '';
    }else{
      alert('Fields empty.');
    }
  }

  deleteTheater(id){
    if(confirm("Click OK to confirm deletion or Cancel to abort.")){
      this.$http.delete('/api/theaters/'+id).then((response) => {
        alert('Theater Deleted Successfully!');
      });
    }else{
      alert('Action aborted');
    }
  }
}

angular.module('yeomanAppApp')
  .component('addtheater', {
    templateUrl: 'app/addtheater/addtheater.html',
    controller: AddtheaterComponent,
    controllerAs: 'addtheaterCtrl'
  });

})();
