'use strict';

angular.module('genesys')
.controller('PublicCtrl', function ($scope, $log, $http, $location, $rootScope) {

	$scope.moduleName = 'public';

	var makeid = function()
	{
		var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 10; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	$scope.clientId = makeid();

	$http.get('/web/auth/' + $scope.clientId).
	success(function(data, status, headers, config) {
	    
	    var token = data;
	    Twilio.Device.setup(token);
	  }).
	  error(function(data, status, headers, config) {
	  	console.log("Error: Getting agent auth token");
	    $("#log").text("Error: Getting agent auth token");
	  });

	Twilio.Device.ready(function (device) {
		$("#log").text("Ready");
	});

	Twilio.Device.error(function (error) {
		$("#log").text("Error: " + error.message);
		console.log("Error: ",error);
	});

	Twilio.Device.connect(function (conn) {
		$("#log").text("Successfully established call");
	});

	Twilio.Device.disconnect(function (conn) {
		$("#log").text("Call ended");
	});

	$scope.call = function() {
		Twilio.Device.connect();
	}

	$scope.hangup = function() {
		Twilio.Device.disconnectAll();
	}

});
