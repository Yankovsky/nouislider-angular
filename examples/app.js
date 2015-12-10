"use strict";

angular.module('exampleApp', ['ya.nouislider', 'ngRoute']).config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'basic/basic.html',
			controller: 'BasicCtrl',
			controllerAs: 'ctrl'
		})
		.when('/options', {
			templateUrl: 'options/options.html',
			controller: 'OptionsCtrl',
			controllerAs: 'ctrl'
		})
		.when('/events', {
			templateUrl: 'events/events.html',
			controller: 'EventsCtrl',
			controllerAs: 'ctrl'
		})
		.when('/disable', {
			templateUrl: 'disable/disable.html',
			controller: 'DisablingSliderCtrl',
			controllerAs: 'ctrl'
		})
		.when('/slide-debounce', {
			templateUrl: 'slide-debounce/slide-debounce.html',
			controller: 'SlideDebounceCtrl',
			controllerAs: 'ctrl'
		})
		.when('/updating-slider-options', {
			templateUrl: 'updating-slider-options/updating-slider-options.html',
			controller: 'UpdatingSliderOptionsCtrl',
			controllerAs: 'ctrl'
		})
		.when('/timeout', {
			templateUrl: 'timeout/timeout.html',
			controller: 'TimeoutCtrl',
			controllerAs: 'ctrl'
		})
		.when('/tooltips', {
			templateUrl: 'tooltips/tooltips.html',
			controller: 'TooltipsCtrl',
			controllerAs: 'ctrl'
		})
		.when('/destroy', {
			templateUrl: 'destroy/destroy.html',
			controller: 'DestroyCtrl',
			controllerAs: 'ctrl'
		});
}).value('noUiSliderConfig', {
	step: 1
})
