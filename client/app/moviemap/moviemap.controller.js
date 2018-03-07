'use strict';



(function(){

class MoviemapComponent {
  constructor($http, socket, $scope) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.socket = socket;
    this.movie = [];
    this.theater = [];
    this.city = [];
    this.$http = $http;
    this.dates = [];
    this.hour = [];
    this.min = [];
    this.timings = [];
    this.data = {};
  }

  $onInit(){
//--------------------------------------------------------------------------------------------------


  $(document).ready(function(){
    $('#add_date').click(function(){
      var datemap = [];
      $('.days:checked').each(function(){
        datemap.push($(this).val());
      });
      if(datemap.length == 0){
        alert('No date selected');
      }
      console.log(datemap);
    });

  // $('#add_time').click(function(){
  //   var hh = $('#hour').val();
  //   var mm = $('#min').val();
  //   var ampm = $('#ampm').val();
  //   var tt = hh+':'+mm+' '+ampm;
  //   console.log(tt);
  //   var i;
  //   for(i=0; i<ttAr.length; i++){
  //     var duplicate = false;
  //     if(tt == ttAr[i]){
  //       duplicate = true;
  //       console.log('duplicate found');
  //     }
  //   }
  //   if(duplicate == true){
  //     alert(tt+' already added');
  //   }else{
  //   // this.timings=tt;
  //     ttAr.push(tt);
  //    // show(ttAr);
  //   //  $scope.aa;
  //     //$scope.aa=tt;
  //   }
  //   console.log(this.timings);
    
  // });
});


    //$digest or $apply
      //this.timings=ttAr;









//-----------------------------------------------------------------------------------------------------------
  this.$http.get('/api/Movies').then((response) => {
    this.movie = response.data;
    console.log(this.movie);
  });

  this.$http.get('/api/theaters').then((response) => {
    this.theater = response.data;
    var cities = [];
    for(var i = 0; i<this.theater.length; i++){
      if(cities.indexOf(this.theater[i].City) == -1){
        cities.push(this.theater[i].City);
      }
    }
    console.log(this.theater);
    console.log(cities);
    this.city = cities;
  });
  
  var date = new Date();
  var day = moment(date);
  console.log(day);
  
  var i;
  for(i=0; i<6; i++){
    this.dates[i] = day.add(1, 'd').format('MMM DD');
  }

  console.log(this.dates);
  
  var j;
  var h = 1;
  for(j=0; j<12; j++){
    this.hour[j] = h;
    if(this.hour[j] < 10){
      this.hour[j] = '0' + h;
    }
    h++;
  }

  var l;
  for(l=0; l<12; l++){
    this.min[l] = l*5;
      if(this.min[l] < 10){
        this.min[l] = '0' + l*5;
      }
  }
  
}


savetime(){

    var hh = this.data.h;
    var mm = this.data.m;
    var ampm = this.data.ampm;
    var tt = hh+':'+mm+' '+ampm;
    console.log(tt);

    var i;
    for(i=0; i<this.timings.length; i++){
      var duplicate = false;
      if(tt == this.timings[i]){
        duplicate = true;
        console.log('duplicate found');
      }
    }

    if(duplicate == true){
      alert(tt+' already added');
    }else{
      this.timings.push(tt);
    }

    console.log(this.data);
    console.log(this.timings);
}

deletetime(time){
  var i = this.timings.indexOf(time);
  console.log(time);
  this.timings.splice(i,1);
  console.log(this.timings);
}

submit(){
  var datemap = [];
      $('.days:checked').each(function(){
        datemap.push($(this).val());
      });
      if(datemap.length == 0){
        alert('No date selected');
      }
      console.log(datemap);

  var items = {
    title: this.data.movieS,
    city: this.data.cityS,
    theater: this.data.theaterS,
    dates: datemap,
    times: this.timings
  };
  var valid = true;
  var check = Object.values(items);
  var check1 = Object.keys(items);

  for(var i=0; i<check.length; i++){
  
    if(Array.isArray(check[i])){
      if(check[i].length == 0){
        valid = false;
      }
    }else{
      if(check[i] == undefined){
        valid = false;
      }
    }
  }
  console.log(valid);
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
