Check demo at http://yankovsky.github.io/nouislider-angular/examples/angular

You can pass any nouislider options to ya-no-ui-slider directive.

Basic use-case:

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

You can set global configuration value noUiSliderConfig and all nouislider options will inherit from it:

```javascript
angular.module('sampleApp', ['ya.nouislider']).value('noUiSliderConfig', {step: 1})
```
