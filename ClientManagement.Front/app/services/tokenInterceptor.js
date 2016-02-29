angular.module('frontApp')
  .factory('TokenInterceptor', ['$q', '$window', '$location',

function ($q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = $window.sessionStorage.token;
            }
            return config;
        },

        requestError: function (rejection) {
            return $q.reject(rejection);
        },

        response: function (response) {
            return response || $q.when(response);
        },

        responseError: function (rejection) {
            if (rejection != null && rejection.status === 401 && $window.sessionStorage.token) {
                delete $window.sessionStorage.token;
                $location.path("/login");
            }

            return $q.reject(rejection);
        }
    };
}])