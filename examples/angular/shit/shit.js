	.controller('ExampleCtrl', function($scope) {
		$scope.eventsLog = [];
		$scope.values = [20, 70]
		$scope.options = {
			range: {min: 0, max: 100}
		}
		function trackEvent(e, range) {
			$scope.eventsLog.push(e.type + ' ' + range);
			if ($scope.eventsLog.length > 10) {
				$scope.eventsLog.splice(0, 1);
			}
		}

		$scope.events = {
			slide: trackEvent,
			set: trackEvent,
			change: trackEvent
		}

		$scope.changeToOneHandleNumber = function() {
			$scope.values = 50
		}

		$scope.changeToOneHandleArray = function() {
			$scope.values = [40]
		}

		$scope.changeToTwoHandles = function() {
			$scope.values = [30, 90]
		}
	})