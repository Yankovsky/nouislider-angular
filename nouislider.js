"use strict";

angular.module('ya.nouislider', [])
  .value('yaNoUiSliderConfig', {})
  .directive('yaNoUiSlider', ['$timeout', '$log', 'yaNoUiSliderConfig', function($timeout, $log, yaNoUiSliderConfig) {
    function toArray(val) {
      return angular.isArray(val) ? val : [val];
    }

    function copy(val) {
      return toArray(val).slice();
    }

    function equals(a, b) {
      a = toArray(a);
      b = toArray(b);

      return a[0] === b[0] && a[1] === b[1];
    }

    function omit(object, property) {
      var keys = Object.keys(object),
        index = -1,
        length = keys.length,
        result = {};

      while (++index < length) {
        var key = keys[index];
        if (key !== property) {
          result[key] = object[key];
        }
      }
      return result;
    }

    return {
      restrict: 'A',
      require: 'yaNoUiSlider',
      scope: {
        yaNoUiSlider: '=',
        yaNoUiSliderDisabled: '=',
        yaNoUiSliderHandle1Disabled: '=',
        yaNoUiSliderHandle2Disabled: '=',
        yaNoUiSliderSlideDebounce: '@'
      },
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        var that = this,
          noUiSliderElement = $element[0],
          noUiSliderEvents = $scope.$parent.$eval($attrs.yaNoUiSliderEvents),
          slideDebounceDelay = $scope.yaNoUiSliderSlideDebounce || 0,
          events = slideDebounceDelay && slideDebounceDelay === 'Infinity' ? ['change'] : ['change', 'slide'],
          noUiSliderInstance,
          origins,
          sliderScope,
          pendingSlideDebounce;

        // allow to get noUiSlider instance from outside of that directive
        that.getNoUiSlider = function() {
          return noUiSliderInstance;
        };

        function toggleDisabled(element, newValue, oldValue) {
          if (newValue) {
            element.setAttribute('disabled', true);
          } else {
            element.removeAttribute('disabled');
          }
        }

        function destroy() {
          sliderScope.$destroy();
          noUiSliderInstance.off('slide change update slide');
          noUiSliderInstance.destroy();
          $timeout.cancel(pendingSlideDebounce);
        }

        function createSlider() {
          function updateValue(newValue) {
            var newValueCopy = copy(newValue);
            if (!equals(newValueCopy, latestValue)) {
              latestValue = newValueCopy;
              $scope.$applyAsync(function() {
                if (angular.isArray(newValue)) {
                  if (angular.isArray($scope.yaNoUiSlider.start)) {
                    $scope.yaNoUiSlider.start[0] = newValue[0];
                    $scope.yaNoUiSlider.start[1] = newValue[1];
                  } else {
                    $scope.yaNoUiSlider.start = newValue[0];
                  }
                } else {
                  $scope.yaNoUiSlider.start = newValue;
                }
              });
            }
          }

          sliderScope = $scope.$new();
          var options = angular.extend({}, yaNoUiSliderConfig, $scope.yaNoUiSlider);
          var latestValue = copy(options.start);
          options.start = copy(options.start);
          noUiSlider.create(noUiSliderElement, options);
          origins = noUiSliderElement.getElementsByClassName('noUi-origin');
          noUiSliderInstance = noUiSliderElement.noUiSlider;

          sliderScope.$watch(function() {
            var modelValue = $scope.yaNoUiSlider.start;
            if (!equals(modelValue, latestValue)) {
              latestValue = copy(modelValue);
              noUiSliderInstance.set(copy(modelValue));
            }
            return latestValue;
          });

          angular.forEach(events, function(eventName) {
            noUiSliderInstance.on(eventName + '.internal', function(values, handle, unencoded) {
              if (eventName === 'slide' && slideDebounceDelay) {
                $timeout.cancel(pendingSlideDebounce);
                pendingSlideDebounce = $timeout(function() {
                  updateValue(unencoded);
                }, slideDebounceDelay);
              } else {
                updateValue(unencoded);
              }
            });
          });

          angular.forEach(noUiSliderEvents, function (handler, event) {
            noUiSliderInstance.on(event + '.noUiSlider', function () {
              var handlerArguments = Array.prototype.slice.call(arguments);
              var self = this;
              $scope.$applyAsync(function () {
                handler.apply(self, handlerArguments);
              });
            });
          });

          sliderScope.$watch('yaNoUiSliderDisabled', toggleDisabled.bind(undefined, noUiSliderElement));
          sliderScope.$watch('yaNoUiSliderHandle1Disabled', toggleDisabled.bind(undefined, origins[0]));
          sliderScope.$watch('yaNoUiSliderHandle2Disabled', function(newValue, oldValue) {
            if (newValue && !origins[1]) {
              return $log.warn('Warning: attempt to toggle disabled state of second handle using ya-no-ui-slider-handle2-disabled attribute in one-handle slider, nouislider-angular is ignoring such call.');
            }
            if (origins[1]) {
              toggleDisabled(origins[1], newValue, oldValue);
            }
          });
        }

        function initialize() {
          $scope.$watch(function() {
            return omit($scope.yaNoUiSlider, 'start');
          }, function() {
            if (noUiSliderInstance) {
              destroy();
            }
            createSlider();
          }, true);

          $scope.$on('$destroy', destroy);
        }

        var initializeWatcher = $scope.$watch('yaNoUiSlider', function(options) {
          if (options) {
            initializeWatcher();
            initialize();
          }
        });
      }]
    }
  }]);
