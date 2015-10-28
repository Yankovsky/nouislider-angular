"use strict";

angular.module('exampleApp').controller('BasicCtrl', function() {
	var that = this;
	that.options1 = {
		start: 30,
		connect: 'lower',
		step: 1,
		range: {
			min: 0,
			max: 100
		}
	};

	that.options2 = {
		start: [30, 90],
		connect: true,
		step: 1,
		range: {
			min: 0,
			max: 100
		}
	};
})