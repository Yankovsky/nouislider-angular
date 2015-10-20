"use strict";

angular.module('exampleApp').controller('DestroyCtrl', function() {
	var that = this;
	that.options = {
		range: {
			min: 0,
			max: 20
		}
	};
	that.value = 15;
	that.shown = true;
});