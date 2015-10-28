# nouislider-angular

Check demo at http://yankovsky.github.io/nouislider-angular/examples/angular

You can pass any [nouislider options](http://refreshless.com/nouislider/slider-options/) options to ya-no-ui-slider directive.

## Basic usage

```javascript
angular.module('sampleApp', ['ya.nouislider'])
  .controller('SampleCtrl', function($scope) {
    $scope.options = {
        start: [20, 70],
        range: {min: 0, max: 100}
    }
})
```
```html
<div ya-no-ui-slider='options'></div>
```

## Options

#### Global config

You can set global configuration value yaNoUiSliderConfig and all nouislider options will inherit from it:

```javascript
angular.module('sampleApp', ['ya.nouislider'])
    .value('yaNoUiSliderConfig', {step: 1})
```

#### Event handlers

#### Disable slider or individual handlers

#### Slide event debounce