(function() {

  "use strict";

  angular.module('angularCroppie', []).
  component('croppie', {
    controller: AngularCroppie,
    bindings: {
      src: '<',
      ngModel: '=',
      onChange: '&',
      options: '@',
      resultConfig: '<'
    }
  });
  AngularCroppie.$inject = ['$scope', '$element'];


  /*@ngInject*/
  function AngularCroppie($scope, $element) {
    var ctrl = this;
    var c;



    ctrl.$onInit = function() {
      //Append/Override update method in 
      vm.options.update = onCroppieUpdate;
      c = new Croppie($element[0],
        vm.options);
    };

    ctrl.$onChanges = function(changesObj) {
      var src = changesObj.src && changesObj.src.currentValue;
      if (src) {
        // bind an image to croppie
        c.bind({
          url: src
        });
      }
    };

    ctrl.$onDestroy = function() {
      if (c) {
        c.destroy();
      }
    };


    function onCroppieUpdate() {
      c.result(vm.resultConfig).then(function(img) {
        $scope.$apply(function() {
          ctrl.ngModel = img;
        });
      });
    }
  }

})();
