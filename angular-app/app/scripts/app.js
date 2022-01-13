'use strict';

var app = angular.module('genesys', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'genesys.config',
  'ark-components',
  'angular-loading-bar',
  'ui.bootstrap'
]);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/main/view.html',
        controller: 'MainCtrl'
      })
      .when('/:module', {
        templateUrl: 'modules/main/view.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
      })
      .when('/:module/:correlationId', {
        templateUrl: 'modules/main/view.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });

/**************************
* Enable Fast Click for Mobile
* Author: C.Connolly
* Date:   2014-10-30
***************************/
app.run(function(){
  FastClick.attach(document.body);
});

/**************************
* Wrapper for external JS calls
* Author: C.Connolly
* Date:   2014-10-30
***************************/

function onNotificationAPN2(message) {

  console.log("External notification");

  var elem = angular.element(document.querySelector('[ng-controller]'));
  var s = elem.scope();

  s.$apply(function(){
    s.$broadcast('push', message);
  });
}
