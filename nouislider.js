angular.module('ya.nouislider', []).value('noUiSliderConfig', {}).directive('noUiSlider', function(noUiSliderConfig) {
  noUiSliderConfig = noUiSliderConfig || {};

  function handlesCount(value) {
    if (angular.isUndefined(value)) return 0
    return angular.isArray(value) && value.length == 2 ? 2 : 1
  }

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      noUiSlider: '=',
      noUiSliderEvents: '=',
      noUiSliderTooltips: '='
    },
    link: function(scope, element, attrs, ngModel) {
      var 
        initialized = false,
        slider = element[0],
        previousValue = undefined;

      scope.$on('$destroy', function() {
        if (initialized) {
          slider.noUiSlider.off('update');
          slider.noUiSlider.off('slide');
          slider.noUiSlider.off('set');
          slider.noUiSlider.off('change');
        }
      });

      function tryToInit() {
        var
          value = ngModel.$viewValue,
          options = angular.extend({}, noUiSliderConfig, scope.noUiSlider, {start: value});

        if (angular.isDefined(options.start) && angular.isDefined(options.range)) {
          if (!initialized) {
            noUiSlider.create(slider, options);
            previousValue = angular.copy(value);

            if (scope.noUiSliderTooltips) {
              var
                tipHandles = slider.getElementsByClassName('noUi-handle'),
                tooltips = [];
                
                for (var i=0; i<tipHandles.length; i++) {
                  tooltips[i] = document.createElement('div');
                  tipHandles[i].appendChild(tooltips[i]);

                  tooltips[i].className += 'tooltip';
                  tooltips[i].innerHTML = scope.noUiSliderTooltips[i];
                }
            }

            angular.forEach(scope.noUiSliderEvents, function(handler, event) {
              slider.noUiSlider.on(event, function(values, handle) {
                handler(values, handle, attrs);
              });
            });
            slider.noUiSlider.on('slide', function(values, handle) {
              ngModel.$setViewValue(values);
              scope.$apply();
            });
          }
          initialized = true;
        }
      }

      ngModel.$render = function() {
        if (!initialized) return;
        
        var 
          value = ngModel.$viewValue,
          newValue = undefined;

        if (handlesCount(value) == 2) {
          value[0] = Math.max(value[0], scope.noUiSlider.range.min);
          value[1] = Math.min(value[1], scope.noUiSlider.range.max);

          var
            fromNotChanged = value[0] == previousValue[0],
            toNotChanged = value[1] == previousValue[1];

          previousValue = angular.copy(value);

          if (value[0] > value[1]) {
            if (fromNotChanged) value[1] = value[0];
            if (toNotChanged) value[0] = value[1];
            if (value[0] > value[1]) value[1] = value[0];
          }

          newValue = [fromNotChanged ? null : value[0], toNotChanged ? null : value[1]];
        } else {
          var valueIsArray = angular.isArray(value);
          if (valueIsArray) value = value[0];
          value = parseFloat(value) || 0;
          value = Math.min(Math.max(value, scope.noUiSlider.range.min), scope.noUiSlider.range.max);
          newValue = valueIsArray ? [value] : value;
          ngModel.$setViewValue(newValue);
        }
        element.val(newValue);
      }

      scope.$watch(function() {
        return scope.noUiSlider;
      }, function() {
        tryToInit();
      }, true);

      scope.$watch(function() {
        return ngModel.$viewValue;
      }, function() {
        ngModel.$render();
      }, true);

      scope.$watch(function() {
        return handlesCount(ngModel.$viewValue);
      }, function(newValue) {
        if (angular.isDefined(newValue)) {
          tryToInit();
        }
      }, true);
    }
  }
});