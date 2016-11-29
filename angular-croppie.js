angular.module('angularCroppie', []).
  component('croppie', {
    bindings: {
      src: '=',
      ngModel: '='
    },
    controller: ['$scope', '$element', function ($scope, $element) {
      var ctrl = this;

      if(!ctrl.src) { return; }

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

      // bind an image to croppie
      c.bind({
        url: ctrl.src
      });
    }]
  });
