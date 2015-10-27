"use strict";

angular.module('ya.nouislider', [])
	.value('yaNoUiSliderConfig', {})
	.directive('yaNoUiSlider', function(yaNoUiSliderConfig) {
		var defaultEvents = ['change', 'slide'];

		return {
			restrict: 'A',
			require: ['yaNoUiSlider', 'ngModel'],
			scope: {
				yaNoUiSlider: '=',
				yaNoUiSliderDisabled: '=',
				yaNoUiSliderHandle1Disabled: '=',
				yaNoUiSliderHandle2Disabled: '='
			},
			controller: function($scope, $element, $attrs) {
				var that = this;
				var noUiSliderElement = $element[0],
					noUiSliderInstance,
					origins,
					ngModelCtrl,
					updateOn,
					events,
					sliderScope;

				// events are not watchable
				var noUiSliderEvents = $scope.$parent.$eval($attrs.yaNoUiSliderEvents);

				function toggleDisabled(element, newValue, oldValue) {
					if (newValue !== oldValue) {
						if (newValue) {
							element.setAttribute('disabled', true);
						} else {
							element.removeAttribute('disabled');
						}
					}
				}

				function destroy() {
					sliderScope.$destroy();
					noUiSliderInstance.off('slide change update slide');
					noUiSliderInstance.destroy()
				}

				function createSlider() {
					sliderScope = $scope.$new();
					var options = angular.extend({}, yaNoUiSliderConfig, $scope.yaNoUiSlider, {start: ngModelCtrl.$modelValue});
					noUiSlider.create(noUiSliderElement, options);
					origins = noUiSliderElement.getElementsByClassName('noUi-origin');
					noUiSliderInstance = noUiSliderElement.noUiSlider;

					var valueIsArray = angular.isArray(ngModelCtrl.$modelValue);
					var lastValue;
					if (valueIsArray) {
						lastValue = ngModelCtrl.$modelValue.slice();
					}

					// angular ngModelController doesn't really support non-primitive objects as models
					if (valueIsArray) {
						sliderScope.$watch(function() {
							var modelValueCopy = ngModelCtrl.$modelValue.slice();
							if (!angular.equals(lastValue, modelValueCopy)) {
								//if (options.direction === 'rtl') {
								//	modelValueCopy.reverse();
								//}
								lastValue = modelValueCopy;
								ngModelCtrl.$modelValue = modelValueCopy;
								ngModelCtrl.$viewValue = modelValueCopy;
							}
							return ngModelCtrl.$modelValue;
						});
					}

					angular.forEach(events, function(eventName) {
						noUiSliderInstance.on(eventName + '.internal', function(values, handle, unencoded) {
							if (!angular.equals(ngModelCtrl.$modelValue, unencoded)) {
								if (valueIsArray) {
									if (options.direction === 'rtl') {
										unencoded.reverse();
									}
									lastValue = unencoded.slice();
								}
								ngModelCtrl.$setViewValue(unencoded, eventName);
								if (updateOn) {
									// trigger event on element so angular could handle custom updateOn ng-model-option
									$element.triggerHandler(eventName, unencoded);
								}
							}
						});
					});

					angular.forEach(noUiSliderEvents, function(handler, event) {
						noUiSliderInstance.on(event + '.noUiSlider', function() {
							var handlerArguments = arguments;
							$scope.$applyAsync(function() {
								handler(handlerArguments);
							});
						});
					});

					sliderScope.$watch('yaNoUiSliderDisabled', toggleDisabled.bind(undefined, noUiSliderElement));
					sliderScope.$watch('yaNoUiSliderHandle1Disabled', toggleDisabled.bind(undefined, origins[0]));
					sliderScope.$watch('yaNoUiSliderHandle2Disabled', toggleDisabled.bind(undefined, origins[1]));
				}

				function initialize() {
					$scope.$watch(function() {
						return $scope.yaNoUiSlider;
					}, function() {
						if (noUiSliderInstance) {
							destroy();
						}
						createSlider();
					}, true);

					var ngModelOptions = ngModelCtrl.$options;
					updateOn = ngModelOptions && ngModelOptions.updateOn;
					events = updateOn ? updateOn.split(' ') : defaultEvents;

					ngModelCtrl.$render = function() {
						noUiSliderInstance.set(ngModelCtrl.$modelValue);
					};

					$scope.$on('$destroy', destroy);
				}

				// allow to get noUiSlider instance from outside of that directive
				that.getNoUiSlider = function() {
					return noUiSliderInstance;
				};

				that.init = function(_ngModelCtrl) {
					ngModelCtrl = _ngModelCtrl
					var initializeWatcher = $scope.$watchGroup([function() {
						return ngModelCtrl.$modelValue;
					}, 'yaNoUiSlider'], function(group) {
						if (group[0] && group[1]) {
							initializeWatcher();
							initialize();
						}
					});
				}
			},
			link: function(scope, element, attrs, ctrls) {
				var yaNoUiSliderCtrl = ctrls[0],
					ngModelCtrl = ctrls[1];

				yaNoUiSliderCtrl.init(ngModelCtrl);
			}
		}
	});