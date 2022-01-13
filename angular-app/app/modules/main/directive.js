'use strict';

angular.module('genesys')
.directive('mainView', [function () {
	return {
		templateUrl: 'modules/main/view.html',
		restrict: 'E'
	};
}]);
