(function () {
    var frontApp = angular.module('frontApp', ['ngRoute']);

    frontApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
      function ($routeProvider, $locationProvider, $httpProvider) {
          
          $routeProvider
            .when('/login', {
                templateUrl: 'partials/login.html'
            })
            .when('/register', {
                templateUrl: 'partials/register.html'
            })
            .when('/user/:email', {
                templateUrl: 'partials/userDetails.html'
            })
            .when('/users', {
                templateUrl: 'partials/usersList.html'
            })
            .otherwise({
                redirectTo: '/login'
            });

          $httpProvider.interceptors.push('TokenInterceptor');
      }]);

    
})();