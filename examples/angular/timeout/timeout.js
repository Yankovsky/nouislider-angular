"use strict";

angular.module('exampleApp').controller('TimeoutCtrl', function($timeout) {
	var that = this;

	$timeout(function() {
		that.options = {
			connect: true,
			step: 1,
			range: {
				min: 0,
				max: 100
			}
		};
		that.value = [30, 90];
	}, 1000);
})