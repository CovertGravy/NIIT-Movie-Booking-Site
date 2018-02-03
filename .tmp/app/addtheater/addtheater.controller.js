'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AddtheaterComponent = function AddtheaterComponent() {
    _classCallCheck(this, AddtheaterComponent);

    this.message = 'Hello';
  };

  angular.module('yeomanAppApp').component('addtheater', {
    templateUrl: 'app/addtheater/addtheater.html',
    controller: AddtheaterComponent,
    controllerAs: 'addtheaterCtrl'
  });
})();
//# sourceMappingURL=addtheater.controller.js.map
