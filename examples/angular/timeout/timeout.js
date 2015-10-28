"use strict";

angular.module('exampleApp').controller('TimeoutCtrl', function($timeout) {
	var that = this;

	$timeout(function() {
		that.options = {
			start: [30, 90],
			connect: true,
			step: 1,
			range: {
				min: 0,
				max: 100
			}
		};
	}, 1000);
})