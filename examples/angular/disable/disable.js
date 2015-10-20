"use strict";

angular.module('exampleApp').controller('DisablingSliderCtrl', function() {
	var that = this;
	that.options1 = {
		connect: 'lower',
		range: {
			min: 0,
			max: 40
		}
	};
	that.options2 = {
		connect: true,
		range: {
			min: 0,
			max: 40
		}
	};
	that.value1 = 20;
	that.value2 = [20, 30];
	that.sliderDisabled = false;
	that.sliderHandle1Disabled = false;
	that.sliderHandle2Disabled = false;
});