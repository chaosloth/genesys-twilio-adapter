/*************************************
* Author: Christopher Connolly
* Date: November 2014
*
* Purpose:
* Inspect HTML pages
* Build GPE DSL File
**************************************/

angular.module('genesys')
.controller('HelpOverlayCtrl', function ($scope, $timeout, $rootScope, $modalInstance, $log, $http) {
	$scope.dismiss = function() {
		$modalInstance.dismiss();
	};
});