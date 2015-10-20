"use strict";

angular.module('exampleApp', ['ya.nouislider', 'ngRoute']).config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'basic/basic.html',
			controller: 'BasicCtrl'
		})
		.when('/options', {
			templateUrl: 'options/options.html'
		})
		.when('/events', {
			templateUrl: 'events/events.html',
			controller: 'EventsCtrl'
		})
		.when('/disable', {
			templateUrl: 'disable/disable.html',
			controller: 'DisablingSliderCtrl'
		})
		.when('/ng-model-options', {
			templateUrl: 'ng-model-options/ng-model-options.html',
			controller: 'NgModelOptionsCtrl'
		})
		.when('/updating-slider-options', {
			templateUrl: 'updating-slider-options/updating-slider-options.html',
			controller: 'UpdatingSliderOptionsCtrl'
		})
		.when('/destroy', {
			templateUrl: 'destroy/destroy.html',
			controller: 'DestroyCtrl'
		});
}).value('noUiSliderConfig', {
	step: 1
})