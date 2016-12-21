angular.module('angularCroppie', []).
  component('croppie', {
    bindings: {
      src: '<',
      ngModel: '='
    },
    controller: function ($scope, $element) {
      var ctrl = this;

      var c = new Croppie($element[0], {
        viewport: {
          width: 200,
          height: 200
        },
        update: function () {
          c.result('canvas').then(function(img) {
            $scope.$apply(function () {
              ctrl.ngModel = img;
            });
          });
        }
      });
      
      ctrl.$onChanges = function (changesObj) {
        var src = changesObj.src && changesObj.src.currentValue;
        if(src) {  
          // bind an image to croppie 
          c.bind({
            url: src
          });
        }
      };
    }
  });
