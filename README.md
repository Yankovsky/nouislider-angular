# nouislider-angular

Check demo at http://yankovsky.github.io/nouislider-angular/examples

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

```javascript
$scope.eventHandlers = {
    update: function(values, handle, unencoded) {},
    slide: function(values, handle, unencoded) {},
    set: function(values, handle, unencoded) {},
    change: function(values, handle, unencoded) {}
}
```
```html
<div ya-no-ui-slider='options' 
     ya-no-ui-slider-events='eventHandlers'></div>
```

#### Disable slider or individual handlers

```html
<div ya-no-ui-slider='options' 
     ya-no-ui-slider-disabled='sliderDisabled'
     ya-no-ui-slider-handle1-disabled='handle1Disabled'
     ya-no-ui-slider-handle2-disabled='handle2Disabled'></div>
```

#### Slide event debounce

```html
<div ya-no-ui-slider='options' 
     ya-no-ui-slider-slide-debounce='300'></div>
```
