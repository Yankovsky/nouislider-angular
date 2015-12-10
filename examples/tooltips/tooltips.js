"use strict";

angular.module('exampleApp').controller('TooltipsCtrl', function() {
	var that = this;
	that.options = {
		start: [20, 80],
		connect: true,
		range: {'min': 0, 'max': 100},
		tooltips: true
	}
});
