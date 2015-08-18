nouislider-angular-sjr
======================

Updated version of [nouislider-angular](https://github.com/Yankovsky/nouislider-angular) by Yankovsky Andrey.

- Updated to use noUiSlider 8.0.2
- Tooltip functionality has been added

I've also updated [angular-nouislider](https://github.com/SteveJRobertson/angular-nouislider-sjr), but have found this Angular wrapper to be more efficient.

Improved documentation to follow.

You can pass any nouislider options to the no-ui-slider directive. You should use ng-model instead of the start property.

Basic use-case:

```javascript
angular.module('sampleApp', ['ya.nouislider'])
  .controller('SampleCtrl', function($scope) {
    $scope.values = [20, 70]
    $scope.options = {
        range: {min: 0, max: 100}
    }
})
```
```html
<div no-ui-slider='options' ng-model='values'></div>
```

You can set global configuration value noUiSliderConfig and all nouislider options will inherit from it:

```javascript
angular.module('sampleApp', ['ya.nouislider']).value('noUiSliderConfig', {step: 1})
```
