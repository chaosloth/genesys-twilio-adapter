'use strict';

angular.module('genesys')
.controller('WelcomeCtrl', function ($scope, $log, $http, $location, $rootScope) {

	$scope.moduleName = 'welcome';
	$scope.messages = [];

	$scope.inputTargetSite = "http://www.genesys.com";

	var deleteAllCookies = function() {
	    var cookies = document.cookie.split(";");

	    for (var i = 0; i < cookies.length; i++) {
	    	var cookie = cookies[i];
	    	var eqPos = cookie.indexOf("=");
	    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	}

	$scope.inspect = function() {
		$rootScope.targetSite = $scope.inputTargetSite;
		deleteAllCookies();
		$location.path("/inspector");
	}

});
