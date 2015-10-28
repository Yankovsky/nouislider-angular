"use strict";

angular.module('exampleApp').controller('DestroyCtrl', function() {
	var that = this;
	that.options = {
		start: 15,
		range: {
			min: 0,
			max: 20
		}
	};
	that.shown = true;
});