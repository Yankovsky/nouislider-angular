"use strict";

angular.module('exampleApp').controller('UpdatingSliderOptionsCtrl', function() {
	var that = this;
	that.options = {
		start: 30,
		range: {
			min: 0,
			max: 40
		}
	};
	that.setRange = function(min, max) {
		that.options.range = {
			min: min,
			max: max
		}
	}
})