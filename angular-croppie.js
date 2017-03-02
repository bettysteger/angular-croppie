angular.module('angularCroppie', []).
  component('croppie', {
    bindings: {
      src: '<',
      ngModel: '=',
      options: '<'
    },
    controller: function ($scope, $element) {
      var ctrl = this;

      var options = angular.extend({
        viewport: {
          width: 200,
          height: 200
        }
      }, ctrl.options);

      options.update = function () {
        c.result('canvas').then(function(img) {
          $scope.$apply(function () {
            ctrl.ngModel = img;
          });
        });
      };

      var c = new Croppie($element[0], options);

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
