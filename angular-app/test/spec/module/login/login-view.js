'use strict';

describe("directive: login", function () {

	var scope, loginService, element, loginServiceMock, compile, button;

	beforeEach(module("ark"));

	beforeEach(function() { 
		loginServiceMock = {
			changeLanguage: function(language, callback) {
				var data = {
		      		"loginFormTitle":
					{
		        		"username":"Benutzername",
		        		"password":"Passwort",
		        		"language":"Sprache",
		        		"button":"Anmelden",
		        		"forgotPassword":"Passwort vergessen?",
		        		"page":"Welcome to sample app",
		        		"copyright":"© 2014 Genesys Telecommunications Laboratories",
		        		"version":"1.0.0",
		       			"termOfUse":"Terms of Use",
		        		"privacyPolicy":"Privacy Policy",
		        		"errorMessage":"Please correct your user name and/or password"
		      		}
	    		}
				callback(data);
		}
		}

		module(function ($provide) {
          $provide.value('loginService', loginServiceMock);
      	});

      	inject(function ($compile, $rootScope, $document) {
			scope = $rootScope.$new();
			compile = $compile;
			element = angular.element('<div class="login"></div>');
	    	element = $compile(element)(scope);
	    	scope.language = {"value":"de", "title":"German"};
	    	$document.find('body').prepend(element);
			scope.$digest();
		})

	});

	it("tracks that changeLanguage is called when language is changed", function () {
		spyOn(loginServiceMock, 'changeLanguage').andCallThrough();
		scope.language = {"value":"de", "title":"German"};
		scope.$digest();
		expect(loginServiceMock.changeLanguage).toHaveBeenCalled();
		expect(JSON.stringify(scope.formTitle)).toBe(JSON.stringify(
	      {
	        "username":"Benutzername",
	        "password":"Passwort",
	        "language":"Sprache",
	        "button":"Anmelden",
	        "forgotPassword":"Passwort vergessen?",
	        "page":"Welcome to sample app",
	        "copyright":"© 2014 Genesys Telecommunications Laboratories",
	        "version":"1.0.0",
	        "termOfUse":"Terms of Use",
	        "privacyPolicy":"Privacy Policy",
	        "errorMessage":"Please correct your user name and/or password"
	      }
	    ));
	});

	afterEach(function() {
		element.remove();
	});
})
