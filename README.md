Check demo at http://yankovsky.github.io/nouislider-angular/example/

You can pass any nouislider options to no-ui-slider directive. You should use ng-model instead of start property.

Basic use-case:

```javascript
angular.module('sampleApp', ['ya.nouislider'])
  .controller('SampleCtrl', function($scope) {
    $scope.values = [20, 70];
    $scope.options = {
      range: {min: 0, max: 100}
    };
})
```
```html
<div no-ui-slider='options' ng-model='values'></div>
```

You can set global configuration value noUiSliderConfig and all nouislider options will inherit from it:

```javascript
angular.module('sampleApp', ['ya.nouislider']).value('noUiSliderConfig', {step: 1})
```

noUiSlider library can also be passed to element, otherwise it is expected to be found from `window.noUiSlider`:

```html
<!-- $scope.lib = noUiSlider || window.noUiSlider; -->
<div no-ui-slider='options' no-ui-slider-lib='lib' ng-model='values'></div>
```

Also, one can boost the performance by triggering the update only on `change` (default: `update`) and/or adjusting the ng-model-options:

```html
<div
  no-ui-slider='options'
  ng-ui-slider-trigger='change'
  ng-model='values'
  ng-model-options='{ debounce: 500 }'>
</div>
```

Field can be disabled with `ng-disabled='true'`
