'use strict';

angular.module('genesys')
.controller('MainCtrl', function ($rootScope, $scope, $log, $http, $routeParams, $location) {

  //$scope.moduleName = 'main';

  $scope.environment = $routeParams.environment;
  $scope.module = ((typeof $routeParams.module == 'undefined') ? 'default' : $routeParams.module);
  $scope.subModule = ((typeof $routeParams.subModule == 'undefined') ? 'default' : $routeParams.subModule);

  $log.debug("Module/Sub/CorrelationID: " + $scope.module + ":" + $scope.subModule + ":" + $scope.correlationId);

});