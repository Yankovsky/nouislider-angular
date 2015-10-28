"use strict";

angular.module('exampleApp').controller('OptionsCtrl', function() {
	var that = this;
	that.options = {
		start: [20, 80],
		step: 10,
		margin: 20,
		connect: true,
		direction: 'rtl',
		orientation: 'vertical',
		behaviour: 'tap-drag',
		range: {'min': 0, 'max': 100},
		pips: {mode: 'steps', density: 2}
	}
});