'use strict';

describe('Controller: sampleLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('ark'));

  var LoginCtrl,
    scope,
    $httpBackend,
    mock;

  // load the controller's module
  beforeEach(function() { 
    mock = {
      login: function (user, pass, callback) {
        callback();
      }
    }

    module(function ($provide) {
      $provide.value('loginService', mock);
    });

    inject(function ($controller, $rootScope, _$httpBackend_) {
      scope = $rootScope.$new();
      LoginCtrl = $controller('sampleLoginCtrl', {
        $scope: scope
      });
    })

  });

  // @TODO - Test
  // test ng-if so if variable is defined language bar will show
  // test ng-if so that if variable is not defined language bar will not show

  it('should read "languageMenu" and use for dropdown box with default to be english', function() {
    // the 2 languages is because the current sample app support 2 language: english and german.  
    expect(scope.languageMenu.length).toBe(2);
    expect(scope.language.title).toBe("English");
  });

  it ('should call on login function without auto-complete result', function (){
    scope.formTitle = {};
    spyOn(mock, 'login').andCallThrough();
    scope.login();
    expect(mock.login).toHaveBeenCalled();
  })

  it ('should call on login function with auto-complete result', function (){
    scope.formTitle = {};
    spyOn(mock, 'login').andCallThrough();
    scope.formData.email = "";
    scope.formData.password = "";
    scope.login();
    expect(mock.login).toHaveBeenCalled();
  })
}); 
