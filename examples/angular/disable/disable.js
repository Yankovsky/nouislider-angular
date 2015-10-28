"use strict";

angular.module('exampleApp').controller('DisablingSliderCtrl', function() {
	var that = this;
	that.options1 = {
		start: 20,
		connect: 'lower',
		range: {
			min: 0,
			max: 40
		}
	};
	that.options2 = {
		start: [20, 30],
		connect: true,
		range: {
			min: 0,
			max: 40
		}
	};
	that.sliderDisabled = false;
	that.sliderHandle1Disabled = false;
	that.sliderHandle2Disabled = false;
});