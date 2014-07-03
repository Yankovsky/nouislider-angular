(function() {
  angular.module('blogunApp').directive('noUiSlider', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        step: '@',
        start: '@',
        end: '@',
        callback: '@',
        margin: '@',
        ngModel: '=',
        ngFrom: '=',
        ngTo: '='
      },
      link: function(scope, element, attrs) {
        var callback, fromParsed, parsedValue, pizdaananasu, pizdabarashku, slider, toParsed;
        callback = void 0;
        fromParsed = void 0;
        parsedValue = void 0;
        slider = void 0;
        toParsed = void 0;
        slider = $(element);
        callback = (scope.callback ? scope.callback : 'slide');
        if ((scope.ngFrom != null) && (scope.ngTo != null)) {
          fromParsed = null;
          toParsed = null;
          slider.noUiSlider({
            start: [scope.ngFrom || scope.start, scope.ngTo || scope.end],
            step: parseFloat(scope.step || 1),
            connect: true,
            margin: parseFloat(scope.margin || 0),
            range: {
              min: [parseFloat(scope.start)],
              max: [parseFloat(scope.end)]
            }
          });
          pizdaananasu = function() {
            var from, to, _ref;
            from = void 0;
            to = void 0;
            _ref = void 0;
            _ref = slider.val();
            from = _ref[0];
            to = _ref[1];
            fromParsed = parseFloat(from);
            toParsed = parseFloat(to);
            console.log('setfromslider', scope.ngTo, toParsed);
            if (scope.ngFrom !== fromParsed || scope.ngTo !== toParsed) {
              return scope.$apply(function() {
                scope.ngFrom = fromParsed;
                return scope.ngTo = toParsed;
              });
            }
          };
          slider.on('set', pizdaananasu);
          slider.on(callback, pizdaananasu);
          scope.$watch('ngFrom', function(newVal, oldVal) {
            console.log('setFromExternal', newVal);
            if (newVal !== fromParsed) {
              return slider.val([newVal, null], {
                set: true
              });
            }
          });
          return scope.$watch('ngTo', function(newVal, oldVal) {
            console.log('setFromExternal', newVal);
            if (newVal !== toParsed) {
              return slider.val([null, newVal], {
                set: true
              });
            }
          });
        } else {
          parsedValue = null;
          slider.noUiSlider({
            start: [scope.ngModel || scope.start],
            step: parseFloat(scope.step || 1),
            range: {
              min: [parseFloat(scope.start)],
              max: [parseFloat(scope.end)]
            }
          });
          pizdabarashku = function() {
            parsedValue = parseFloat(slider.val());
            return scope.$apply(function() {
              return scope.ngModel = parsedValue;
            });
          };
          slider.on('set', pizdabarashku);
          slider.on(callback, pizdabarashku);
          return scope.$watch('ngModel', function(newVal, oldVal) {
            if (newVal !== parsedValue) {
              return slider.val(newVal, {
                set: true
              });
            }
          });
        }
      }
    };
  });

}).call(this);
