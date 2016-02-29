angular.module('frontApp')
       .controller('baseController', ['$window', 'UserService', '$location',
function ($window, UserService, $location) {
    var self = this;

    self.name = $window.sessionStorage.name;
    self.isAdmin = $window.sessionStorage.isAdmin == "true";
    self.isLoggedIn = UserService.isLoggedIn;

    self.logout = function () {
        UserService.isLoggedIn = false;
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.isAdmin;
        delete $window.sessionStorage.name;

        self.name = undefined;
        self.isAdmin = undefined;
        self.isLoggedIn = undefined;

        $location.path('/#/login');
    };
}])