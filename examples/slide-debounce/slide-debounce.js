"use strict";

angular.module('exampleApp').controller('SlideDebounceCtrl', function() {
	var that = this;
	that.options1 = {
		start: 15,
		range: {
			min: 0,
			max: 20
		}
	};
	that.options2 = {
		start: 5,
		range: {
			min: 0,
			max: 20
		}
	};
	that.options3 = {
		start: 10,
		range: {
			min: 0,
			max: 20
		}
	};
});