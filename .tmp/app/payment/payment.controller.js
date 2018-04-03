'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var PaymentComponent = function () {
    function PaymentComponent($http) {
      _classCallCheck(this, PaymentComponent);

      this.$http = $http;
      this.userdata;
    }

    _createClass(PaymentComponent, [{
      key: '$onInit',
      value: function $onInit() {

        this.userdata = JSON.parse(sessionStorage.ticket);
        console.log(this.userdata);

        //valid format
        var card = document.getElementById('cardnumber');
        var expiry = document.getElementById('expiry');
        var cvc = document.getElementById('cvc');

        payform.cardNumberInput(card);
        payform.expiryInput(expiry);
        payform.cvcInput(cvc);
      }
    }, {
      key: 'valid',
      value: function valid(event) {
        var field = event.target.id;
        var value = event.target.value;
        var validate = {
          card: false,
          exp: false,
          cvc: false
        };

        console.log(typeof value === 'undefined' ? 'undefined' : _typeof(value));
        console.log(field, value);

        switch (field) {
          case 'cardnumber':
            // let val = value.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'');
            // console.log(val);
            console.log(payform.validateCardNumber(value));
            if (payform.validateCardNumber(value)) {
              validate.card = true;
            }
            break;

          case 'expiry':
            var mmyy = payform.parseCardExpiry(value);
            console.log(mmyy);
            console.log(payform.validateCardExpiry(mmyy.month, mmyy.year));
            if (payform.validateCardExpiry(mmyy.month, mmyy.year)) {
              validate.exp = true;
            }
            break;

          case 'cvc':
            console.log(payform.validateCardCVC(value));
            if (payform.validateCardCVC(value)) {
              validate.cvc = true;
            }
            break;

        }
      }
    }, {
      key: 'pay',
      value: function pay() {

        var session = false;
        if (sessionStorage.ticket) {
          session = true;
        }
        if (this.cardnumber !== undefined && this.expiry !== undefined && this.cvc !== undefined && this.cardname !== undefined && session) {
          this.$http.post('/api/tickets', {
            movie: this.userdata.movie,
            state: this.userdata.state,
            city: this.userdata.city,
            location: this.userdata.location,
            date: this.userdata.date,
            time: this.userdata.time,
            tickets: this.userdata.tickets,
            seats: this.userdata.seats
          }).then(function (response) {
            alert('Success!');
            sessionStorage.setItem('booked', sessionStorage.ticket);
            sessionStorage.removeItem("ticket");
            location.href = '/booked';
          });
        } else if (!session) {
          alert('session data unavailable!');
        } else {
          alert('Payment credentials incorrect/missing!');
        }
      }
    }]);

    return PaymentComponent;
  }();

  angular.module('yeomanAppApp').component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });
})();
//# sourceMappingURL=payment.controller.js.map
