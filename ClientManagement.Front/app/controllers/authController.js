angular.module('frontApp')
       .controller('AuthCtrl', ['UserService', '$location', '$window', '$log', '$scope',
function (UserService, $location, $window, $log, $scope) {
    var self = this;
    var parentScope = $scope.$parent;

    self.user = {
        email: '',
        name: '',
        lastName: '',
        password: '',
        isAdmin: false
    };

    self.register = function () {
        
        UserService.register(self.user).then(function (success) {
            self.errorMessage = undefined;
            $location.path('/login');
        }, function (err) {
            $log.error(err);
            
            self.errorMessage = "Error occured.";
        });
    };

    self.login = function () {
        var loginModel = {
            email: self.user.email,
            password: self.user.password
        };

        UserService.login(loginModel).then(function (success) {
            self.errorMessage = undefined;
            $window.sessionStorage.token = success.data.token;
            $window.sessionStorage.isAdmin = success.data.user.isAdmin;
            $window.sessionStorage.name = success.data.user.name;

            parentScope.base.isAdmin = success.data.user.isAdmin;
            parentScope.base.name = success.data.user.name;
            parentScope.base.isLoggedIn = true;

            $location.path('/user/' + success.data.user.email);
        }, function (error) {
            $log.error(error);
            if (error.status == 401) {
                self.errorMessage = "Invalid credentials.";
            } else {
                self.errorMessage = "Error occured. Try later."
            }
            
        })
    };
}])

