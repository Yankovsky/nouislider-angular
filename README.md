Check demo at http://yankovsky.github.io/nouislider-angular

You can pass any nouislider options to no-ui-slider directive. You should use ng-model instead of start.

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
