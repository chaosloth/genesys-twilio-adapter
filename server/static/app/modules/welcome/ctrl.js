'use strict';

angular.module('genesys')
.controller('WelcomeCtrl', function ($scope, $log, $http, $location, $rootScope) {

	$scope.moduleName = 'welcome';

	$http.get('/agent/auth/Christopher').
	success(function(data, status, headers, config) {
	    
	    var token = data;
	    Twilio.Device.setup(token);
	  }).
	  error(function(data, status, headers, config) {
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

	Twilio.Device.incoming(function (conn) {
        $("#log").text("Incoming connection from " + conn.parameters.From);
        // accept the incoming connection and start two-way audio
        conn.accept();
    });
 

	$scope.call = function() {
		Twilio.Device.connect();
	}

	$scope.hangup = function() {
		Twilio.Device.disconnectAll();
	}

});
