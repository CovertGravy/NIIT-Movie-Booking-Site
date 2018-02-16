'use strict';



(function(){

class MoviemapComponent {
  constructor($http) {
    this.message = 'Hello';
    this.movie = [];
    this.theater = [];
    this.$http = $http;
    this.dates = [];

    $(document).ready(function(){
      $('#add_date').click(function(){
        var datemap = [];
        $('.days:checked').each(function(){
          datemap.push($(this).val());
        });
        console.log(datemap);
      });
    });
  }

  $onInit(){
    this.$http.get('/api/Movies').then((response) => {
      this.movie = response.data;
      console.log(this.movie);
  });

  this.$http.get('/api/theaters').then((response) => {
    this.theater = response.data;
    console.log(this.theater);
  });
  
  var date = new Date();
  var day = moment(date);
  console.log(day);
  var i;
  for(i=0; i<6; i++){
    var x = 1;
    this.dates[i] = day.add(x, 'd').format('MMM DD');
    x++;
  }

  console.log(this.dates);
  
  
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
  
}

angular.module('yeomanAppApp')
  .component('moviemap', {
    templateUrl: 'app/moviemap/moviemap.html',
    controller: MoviemapComponent,
    controllerAs: 'moviemapCtrl'
  });

})();
