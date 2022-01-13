'use strict';

angular.module('genesys')
.directive('inspector', [function () {
	return {
		templateUrl: 'modules/inspector/view.html',
		restrict: 'E'
	};
}]);
