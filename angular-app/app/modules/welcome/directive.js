'use strict';

angular.module('genesys')
.directive('welcome', [function () {
	return {
		templateUrl: 'modules/welcome/view.html',
		restrict: 'E'
	};
}]);
