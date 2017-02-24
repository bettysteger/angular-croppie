(function() {

  "use strict";

  angular.module('angularCroppie', []).
  component('croppie', {
    controller: AngularCroppie,
    bindings: {
      ngModel: '=', //always holds the most recent value of Croppie.result
      onChange: '&', //called when Croppie fires an update. Returns $event: {model: ngModel}
      options: '<', // Options object (needs to be present when component is initialized) and doesn't change
      zoom: '<', // calls Croppie.setZoom(zoom) on change
      rotate: '<', // calls Croppie.rotate(rotate) on change
      bindConfig: '<', //calls Croppie.bind(bindConfig) on change
      resultConfig: '<', //calls Croppie.result(resultConfig) on change (results in onChange being called)
      src: '<' // For simplifying bindConfig: it changes url in bindConfig then calls Croppie.bind(bindConfig)
    }
  });
  AngularCroppie.$inject = ['$scope', '$element'];

  /*@ngInject*/
  function AngularCroppie($scope, $element) {
    var ctrl = this;
    var c;

    ctrl.$onInit = function() {
      if (!c) {

        var changesObj = {};
        if (ctrl.src) {
          changesObj.src = {
            currentValue: ctrl.src
          };
        }
        if (ctrl.zoom) {
          changesObj.zoom = {
            currentValue: ctrl.zoom
          };
        }
        if (ctrl.rotate) {
          changesObj.rotate = {
            currentValue: ctrl.rotate
          };
        }
        if (ctrl.bindConfig) {
          changesObj.bindConfig = {
            currentValue: ctrl.bindConfig
          };
        }
        if (ctrl.resultConfig) {
          changesObj.resultConfig = {
            currentValue: ctrl.resultConfig
          };
        }
        ctrl.$onChanges(changesObj);
      }
    };

    ctrl.$onChanges = function(changesObj) {
      if (!c && (changesObj.bindConfig || changesObj.src)) {
        initCroppie();
      }
      if (changesObj.bindConfig) {
        var bindConf = changesObj.bindConfig.currentValue || {};
        if (bindConf) {
          // bind an image to croppie
          c.bind(bindConf);
        }
      }
      if (changesObj.zoom) {
        var zoom = changesObj.zoom.currentValue || {};
        c.setZoom(zoom);
      }
      if (changesObj.rotate) {
        var rotate = changesObj.rotate.currentValue || {};
        c.rotate(rotate);
      }
      if (changesObj.resultConfig) {
        onCroppieUpdate();
      }
      if (changesObj.src) {
        var src = changesObj.src.currentValue || '';
        if (ctrl.bindConfig) {
          ctrl.bindConfig.url = src;
        } else {
          ctrl.bindConfig = {
            url: src
          };
        }
        c.bind(ctrl.bindConfig);
      }
    };

    ctrl.$onDestroy = function() {
      if (c) {
        c.destroy();
      }
    };

    function onCroppieUpdate() {
      if (c) {
        c.result(ctrl.resultConfig).then(function(img) {
          $scope.$apply(function() {
            ctrl.ngModel = img;
          });
          ctrl.onChange({
            $event: {
              model: ctrl.ngModel
            }
          });
        });
      }
    }

    function initCroppie() {

      if (!c) {
        ctrl.options.update = onCroppieUpdate;
        c = new Croppie($element[0],
          ctrl.options);
      }
    }
  }

})();
