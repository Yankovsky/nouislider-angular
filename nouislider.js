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
					parentScope = $scope.$parent;

				// events are not watchable
				var noUiSliderEvents = parentScope.$eval($attrs.yaNoUiSliderEvents);

				// allow to get noUiSlider instance from outside of that directive
				that.getNoUiSlider = function() {
					return noUiSliderInstance;
				};

				that.init = function(ngModelCtrl) {
					var initializeWatcher = $scope.$watch(function() {
						return ngModelCtrl.$modelValue;
					}, initialize);

					function initialize(value) {
						initializeWatcher();
						var options = angular.extend({}, yaNoUiSliderConfig, $scope.yaNoUiSlider, {start: value})
						noUiSlider.create(noUiSliderElement, options);
						origins = noUiSliderElement.getElementsByClassName('noUi-origin');
						noUiSliderInstance = noUiSliderElement.noUiSlider;

						var ngModelOptions = ngModelCtrl.$options;
						var updateOn = ngModelOptions && ngModelOptions.updateOn;
						var events = updateOn ? updateOn.split(' ') : defaultEvents;

						angular.forEach(events, function(eventName) {
							noUiSliderInstance.on(eventName + '.internal', function(values, handle, unencoded) {
								if (!angular.equals(ngModelCtrl.$modelValue, unencoded)) {
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

						//var huy
						//if (angular.isArray(value)) {
						//	huy = $scope.$watch(function() {
						//		return ngModelCtrl.$modelValue;
						//	}, function() {
						//		$scope.$parent['ctrl']['value2'] = ngModelCtrl.$modelValue.slice()
						//		//	$scope.ngModel
						//		//ngModelCtrl.$modelValue = ngModelCtrl.$modelValue.slice()
						//		//huy()
						//	}, true);
						//}

						ngModelCtrl.$render = function() {
							noUiSliderInstance.set(ngModelCtrl.$modelValue);
						};

						//scope.$watch(function() {
						//	return scope.yaNoUiSlider;
						//}, function(newValue) {
						//	if (newValue) {
						//		var val = noUiSliderInstance.get();
						//		noUiSliderInstance.destroy();
						//		scope.yaNoUiSlider.start = Number(val);
						//		noUiSlider.create(noUiSliderElement, scope.yaNoUiSlider);
						//	}
						//}, true)

						$scope.$watch('yaNoUiSliderDisabled', toggleDisabled.bind(undefined, noUiSliderElement));
						$scope.$watch('yaNoUiSliderHandle1Disabled', toggleDisabled.bind(undefined, origins[0]));
						$scope.$watch('yaNoUiSliderHandle2Disabled', toggleDisabled.bind(undefined, origins[1]));

						function toggleDisabled(element, newValue, oldValue) {
							if (newValue !== oldValue) {
								if (newValue) {
									element.setAttribute('disabled', true);
								} else {
									element.removeAttribute('disabled');
								}
							}
						}

						$scope.$on('$destroy', function() {
							noUiSliderInstance.off('slide.internal change.internal update.noUiSlider slide.noUiSlider set.noUiSlider change.noUiSlider');
							noUiSliderInstance.destroy()
						});
					}
				}

			},
			link: function(scope, element, attrs, ctrls) {
				var yaNoUiSliderCtrl = ctrls[0],
					ngModelCtrl = ctrls[1];

				yaNoUiSliderCtrl.init(ngModelCtrl);
			}
		}
	});