angular.module('frontApp')
  .factory('UserService', ['$http', '$window',

function ($http, $window) {
    var config = {
        baseUrl: 'http://localhost:1337/api/'
    };

    var service = {
        isLoggedIn: $window.sessionStorage.token ? true : false,
        
        updateUser: function (user) {
            return $http.post(config.baseUrl + 'user', user)
            .then(function (response) {
                return response;
            });
        },

        getUsers: function () {
            return $http.get(config.baseUrl + 'users')
            .then(function (response) {
                return response;
            });
        },

        getUser: function (email) {
            return $http.get(config.baseUrl + 'user/' + email)
            .then(function (response) {
                return response;
            });
        },

        login: function (user) {
            return $http.post(config.baseUrl + 'login', user)
            .then(function (response) {
                service.isLoggedIn = true;
                return response;
            });
        },

        register: function (user) {
            return $http.post(config.baseUrl + 'register', user)
            .then(function (response) {
                return response;
            });
        }
    };
    return service;
}]);