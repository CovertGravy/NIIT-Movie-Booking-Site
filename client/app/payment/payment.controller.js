'use strict';

(function () {

  class PaymentComponent {
    constructor($http) {
      this.$http = $http;
      this.userdata;
    }

    $onInit() {

      this.userdata = JSON.parse(sessionStorage.ticket);
      console.log(this.userdata);



      //valid format
      let card = document.getElementById('cardnumber');
      let expiry = document.getElementById('expiry');
      let cvc = document.getElementById('cvc');
                  
      payform.cardNumberInput(card);
      payform.expiryInput(expiry);
      payform.cvcInput(cvc);
    }

    valid(event) {
      let field = event.target.id;
      let value = event.target.value;
      let validate = {
        card: false,
        exp: false,
        cvc: false
      }

      console.log(typeof (value));
      console.log(field, value);

      switch (field) {
        case 'cardnumber':
          // let val = value.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'');
          // console.log(val);
          console.log(payform.validateCardNumber(value));
          if(payform.validateCardNumber(value)){
            validate.card = true;
          }
          break;
        
        case 'expiry':
          let mmyy = payform.parseCardExpiry(value);
          console.log(mmyy);
          console.log(payform.validateCardExpiry(mmyy.month, mmyy.year));
          if(payform.validateCardExpiry(mmyy.month, mmyy.year)){
            validate.exp = true;
          }
          break;

        case 'cvc':
          console.log(payform.validateCardCVC(value));
          if(payform.validateCardCVC(value)){
            validate.cvc = true;
          }
          break;
          
      }
    }

    pay() {

      let session = false;
      if(sessionStorage.ticket){
        session = true;
      }
      if(this.cardnumber !== undefined && this.expiry !== undefined && this.cvc !== undefined && this.cardname !== undefined && session){
      this.$http.post('/api/tickets', {
        movie: this.userdata.movie,
        state: this.userdata.state,
        city: this.userdata.city,
        location: this.userdata.location,
        date: this.userdata.date,
        time: this.userdata.time,
        tickets: this.userdata.tickets,
        seats: this.userdata.seats
      }).then(response =>{
        alert('Success!');
        sessionStorage.setItem('booked', sessionStorage.ticket);
        sessionStorage.removeItem("ticket");
        location.href = '/booked';
      });
    }else if(!session){
      alert('session data unavailable!');
    }else{
      alert('Payment credentials incorrect/missing!');
    }
    }
  }

  angular.module('yeomanAppApp')
    .component('payment', {
      templateUrl: 'app/payment/payment.html',
      controller: PaymentComponent,
      controllerAs: 'paymentCtrl'
    });

})();
