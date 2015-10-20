"use strict";

angular.module('exampleApp').controller('NgModelOptionsCtrl', function() {
	var that = this;
	that.options = {
		range: {
			min: 0,
			max: 20
		}
	};
	that.value1 = 15;
	that.value2 = 5;
	that.value3 = 10;
});