"use strict";

angular.module('exampleApp').controller('EventsCtrl', function($timeout) {
	function addLogEntry(eventName) {
		that.highlighted[eventName] = true
		$timeout(function() {
			that.highlighted[eventName] = false;
		}, 450);
	}

	var that = this;
	that.options = {
		start: [5, 10],
		connect: true,
		range: {
			min: 0,
			max: 20
		}
	};
	that.events = {
		update: addLogEntry.bind(undefined, 'update'),
		slide: addLogEntry.bind(undefined, 'slide'),
		set: addLogEntry.bind(undefined, 'set'),
		change: addLogEntry.bind(undefined, 'change')
	};
	that.highlighted = {};
});
