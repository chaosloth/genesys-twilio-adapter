'use strict';

describe('Service: sample app login', function () {

	// load the controller's module
	beforeEach(module('ark'));

  var loginService,
	scope,
	$httpBackend,
	location;

  // Initialize the controller and a mock scope
	beforeEach(inject(function ($rootScope, _$httpBackend_,_loginService_, $location) {
		scope = $rootScope.$new();
		location = $location;
		loginService = _loginService_;
		$httpBackend = _$httpBackend_;
		$httpBackend.when('GET', 'modules/login/locale/en/locale.json').respond({
			"loginFormTitle":{
				"username":"User Name",
				"password":"Password",
				"language":"Language",
				"button": "Log In",
				"forgotPassword":"Forgot your password?",
				"page":"Welcome to sample app",
				"copyright":"© 2014 Genesys Telecommunications Laboratories",
				"version":"1.0.0",
				"termOfUse":"Terms of Use",
				"privacyPolicy":"Privacy Policy",
        "errorMessage":"Please correct your user name and/or password"
			}
    });
    $httpBackend.when('GET', 'modules/login/locale/de/locale.json').respond({
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
    });
    $httpBackend.when('GET', 'http://ci-vm159.us.int.genesyslab.com:8096/api/v1/login?user=hello&pass=bye').respond(401,'');
    $httpBackend.when('GET', 'http://ci-vm159.us.int.genesyslab.com:8096/api/v1/login?user=user&pass=pass123').respond('');
  }));

  it ('login form should be loaded with english form title', function() {
    expect(scope.formTitle).toBeUndefined();
    loginService.changeLanguage('en',function(data) {
      scope.formTitle = data.loginFormTitle;
    });
    $httpBackend.flush();
    expect(JSON.stringify(scope.formTitle)).toBe(JSON.stringify(
      {
        "username":"User Name",
        "password":"Password",
        "language":"Language",
        "button": "Log In",
        "forgotPassword":"Forgot your password?",
        "page":"Welcome to sample app",
        "copyright":"© 2014 Genesys Telecommunications Laboratories",
        "version":"1.0.0",
        "termOfUse":"Terms of Use",
        "privacyPolicy":"Privacy Policy",
        "errorMessage":"Please correct your user name and/or password"
      }
    ));
  });

  it ('login form should be loaded with german form title', function() {
    expect(scope.formTitle).toBeUndefined();
    loginService.changeLanguage('de',function(data) {
      scope.formTitle = data.loginFormTitle;
    });
    $httpBackend.flush();
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

  it ('when login submit success should redirect', function () {
    loginService.login('user', 'pass123');
    $httpBackend.flush();
    expect(location.$$url).toBe('/css-demo-view');
  });
  it('when login is unsuccessful it should produce error message', function(){
    loginService.changeLanguage('en',function(data) {
      scope.formTitle = data.loginFormTitle;
    });
    $httpBackend.flush();
    loginService.login('hello', 'bye', function(){
      scope.errorMessage = scope.formTitle.errorMessage;
    });
    $httpBackend.flush();
    expect(scope.errorMessage).toBe("Please correct your user name and/or password");
  });
});