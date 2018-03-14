'use strict';

(function(){

class AddmovieComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.MovieData = {};
    this.MovieList = [];
    //this.showMovie();

  }
  //console.log("thisis "+this.MovieList);

  $onInit() {
    console.log("hello");
    this.showMovie();
    
    // this.$http.get('/api/things')
    //   .then(response => {
    //     this.awesomeThings = response.data;
    //     this.socket.syncUpdates('thing', this.awesomeThings);
    //   });
  }




  showMovie(){
    console.log('api called');
    this.$http.get('/api/Movies').then((response) => {
      this.MovieList = response.data;
      console.log(this.MovieList);
      this.socket.syncUpdates('Movie', this.MovieList);
    });
  }

  
  SearchMovie(){
    var a=this.MovieName;
    var b=this.MovieYear;
    console.log("value of a is "+a);
    if(a == undefined||a == ''){
      alert('Movie name required!!');
    }
    else{
    this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=536b243c9c6c280a37f5047a1612242f&query=' +a + '&year=' +b).then(
      response => {
       var MovieID = response.data.results[0].id;
       this.$http.get('https://api.themoviedb.org/3/movie/' + MovieID + '?api_key=536b243c9c6c280a37f5047a1612242f').
       then(
       response=> {
                console.log(response.data);            
                this.MovieData = response.data;
                
            });
                  //console.log(response.data.results[0]);
      });
    }
  }

 
  //showMovie();

  addMovie(){
    
    this.$http.post('/api/Movies', this.MovieData)
    .then((response) => {
      console.log(response);  
      if(response.data.code==11000)
      {
        alert('Movie ['+this.MovieData.title+'] is already in Database.');
      }
      else{
        alert('Movie ['+this.MovieData.title+'] added successfully.');
        this.MovieData = {};
        this.MovieName = "";

      }
     
    });
   
  }

  deleteMovie(id){
    if(confirm("Click OK to confirm deletion or Cancel to abort.")){
      this.$http.delete('/api/Movies/'+id).then((response) => {
        alert('Movie Deleted Successfully!');
      });
    }else{
      alert('Action aborted');
    }
  }

  
}

angular.module('yeomanAppApp')
  .component('addmovie', {
    templateUrl: 'app/addmovie/addmovie.html',
    controller: AddmovieComponent,
   controllerAs: 'addmovieCtrl'
  });

  

})();
