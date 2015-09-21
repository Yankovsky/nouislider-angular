# nouislider-angular

Check demo at http://yankovsky.github.io/nouislider-angular/example/

You can pass any [nouislider options](http://refreshless.com/nouislider/slider-options/) to no-ui-slider directive. Use ng-model instead of start property.

## Basic usage

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

## Options

#### Global config

You can set global configuration value noUiSliderConfig and all nouislider options will inherit from it:

```javascript
angular.module('sampleApp', ['ya.nouislider'])
  .value('noUiSliderConfig', {step: 1})
```

#### Attribute: ng-ui-slider-debounce

Delay the `element.noUiSlider.set` execution by given amount of milliseconds. This can improve the performance in certain cases. Defaults to `0`.

```html
<div
  no-ui-slider='options'
  ng-ui-slider-trigger='change'
  ng-ui-slider-debounce='100'
  ng-model='values'
</div>
```

#### Attribute: ng-ui-slider-trigger

One can adjust the performance by triggering the update only on `change` (default: `update`) and/or adjusting the Angular `ng-model-options`:

```html
<div
  no-ui-slider='options'
  ng-ui-slider-trigger='change'
  ng-model='values'
  ng-model-options='{ debounce: 500 }'>
</div>
```

However, for best user experience, adjust the `ng-ui-slider-debounce` instead.

#### Attribute: no-ui-slider-lib

noUiSlider library can also be passed to element, otherwise it is expected to be found from `window.noUiSlider`:

```html
<!-- $scope.lib = noUiSlider || window.noUiSlider; -->
<div no-ui-slider='options' no-ui-slider-lib='lib' ng-model='values'></div>
```

#### Attribute: ng-disable

Component supports Angular standard for disabling the field: `ng-disabled='true'`
