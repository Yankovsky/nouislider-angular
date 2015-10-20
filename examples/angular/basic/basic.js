"use strict";

angular.module('exampleApp').controller('BasicCtrl', function() {
	var that = this;
	that.options1 = {
		connect: 'lower',
		step: 1,
		range: {
			min: 0,
			max: 100
		}
	};
	that.value1 = 30;

	that.options2 = {
		connect: true,
		step: 1,
		range: {
			min: 0,
			max: 100
		}
	};
	that.value2 = [30, 90];

	that.dsg = function() {
		that.value1 = 15;
	}
})