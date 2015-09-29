angular.module('ya.nouislider', []).value('noUiSliderConfig', {}).directive('noUiSlider', function(noUiSliderConfig) {
  noUiSliderConfig = noUiSliderConfig || {}
  function handlesCount(value) {
    if (angular.isUndefined(value)) return 0
    return angular.isArray(value) && value.length == 2 ? 2 : 1
  }

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngDisabled: '=',
      noUiSlider: '=',
      noUiSliderLib: '=',
      noUiSliderEvents: '=',
      noUiSliderTrigger: '@'
    },
    link: function(scope, elements, attrs, ngModel) {
      var initialized = false,
        previousValue = undefined,
        element = elements[0];

      scope.$on('$destroy', function() {
        element.noUiSlider.off('slide set change update');
      });

      function tryToInit() {
        var value = ngModel.$viewValue,
          options = angular.extend({}, noUiSliderConfig, scope.noUiSlider, {start: value}),
          noUiSlider = scope.noUiSliderLib ? scope.noUiSliderLib : window.noUiSlider;
        if (angular.isDefined(options.start) && angular.isDefined(options.range)) {
          previousValue = angular.copy(value);
          if (!initialized) {
            noUiSlider.create(element, options);
            angular.forEach(scope.noUiSliderEvents, function(event, handler) {
              element.noUiSlider.on(event, handler);
            });
            element.noUiSlider.on((scope.noUiSliderTrigger || 'update'), function(value) {
				// NOTE: Reading the value using .get() because handler always returns an array
				value = element.noUiSlider.get();
				var valueIsArray = angular.isArray(value);
				if (valueIsArray) {
					value = [parseFloat(value[0]) || scope.noUiSlider.range.min, parseFloat(value[1]) || scope.noUiSlider.range.max];
					value = [
							Math.min(Math.max(value[0], scope.noUiSlider.range.min), scope.noUiSlider.range.max),
							Math.min(Math.max(value[1], scope.noUiSlider.range.min), scope.noUiSlider.range.max)
					];
				} else {
					value = parseFloat(value) || 0;
					value = Math.min(Math.max(value, scope.noUiSlider.range.min), scope.noUiSlider.range.max);
				}  
				newValue = value;
				ngModel.$setViewValue(newValue);
            });
            // Disable the field per request
            element.removeAttribute('disabled');
            if (scope.ngDisabled) {
              element.setAttribute('disabled', true);
            }
          }
          initialized = true;
        }
      }

      ngModel.$render = function() {
        if (!initialized) return
        var value = ngModel.$viewValue,
          newValue = undefined
        if (handlesCount(value) == 2) {
          value[0] = Math.max(value[0], scope.noUiSlider.range.min)
          value[1] = Math.min(value[1], scope.noUiSlider.range.max)
          var fromNotChanged = value[0] == previousValue[0],
            toNotChanged = value[1] == previousValue[1]
          previousValue = angular.copy(value)
          if (value[0] > value[1]) {
            if (fromNotChanged) value[1] = value[0]
            if (toNotChanged) value[0] = value[1]
            if (value[0] > value[1]) value[1] = value[0]
          }
          newValue = [fromNotChanged ? null : value[0], toNotChanged ? null : value[1]]
        } else {
          var valueIsArray = angular.isArray(value)
          if (valueIsArray) value = value[0]
          value = parseFloat(value) || 0
          value = Math.min(Math.max(value, scope.noUiSlider.range.min), scope.noUiSlider.range.max)
          newValue = valueIsArray ? [value] : value
          ngModel.$setViewValue(newValue);
        }
        element.noUiSlider.set(newValue);
      }

      scope.$watch(function() {
        return scope.noUiSlider
      }, function() {
        tryToInit()
      }, true)

      scope.$watch(function() {
        return ngModel.$viewValue
      }, function() {
        ngModel.$render()
      }, true)

      scope.$watch(function() {
        return handlesCount(ngModel.$viewValue)
      }, function(newValue) {
        if (angular.isDefined(newValue)) {
          tryToInit()
        }
      }, true)
    }
  }
})