"use strict";

angular.module('exampleApp').controller('MultipleSlidersBindingCtrl', function($scope) {
	var that = this;

	var commonOptions = {
		connect: 'lower',
		step: 1,
		range: {
			min: 0,
			max: 20
		}
	};


	that.rand = function() {
		return Math.floor(Math.random() * 21);
	};

	that.numbers = [5, 10, 15];

	that.slidersOptions = [];

	that.addSlider = function(number) {
		var options = angular.copy(commonOptions);
		options.start = number;

		that.slidersOptions.push(options);
	};

	that.removeSlider = function(index) {
		that.slidersOptions.splice(index, 1);
	};

	that.numbers.forEach(function(number) {
		that.addSlider(number);
	});

	$scope.$watchCollection(function() {
		return that.slidersOptions.map(function(options) {
			return options.start;
		})
	}, function(newValue) {
		that.numbers = newValue;
	});
});