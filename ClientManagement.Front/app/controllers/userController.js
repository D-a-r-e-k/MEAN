angular.module('frontApp')
       .controller('UserCtrl', ['UserService', '$routeParams', '$log', '$location',
function (UserService, $routeParams, $log, $location) {
    var self = this;
    self.successMessage = undefined;

    var init = function () {
        UserService.getUser($routeParams.email).then(function (success) {
            self.errorMessage = undefined;
            self.user = success.data;
        }, function (err) {
            $log.error(err);
            if (err.status == 401) {
                $location.path('/login');
            } else {
                self.errorMessage = "User was not found.";
            }
        });
    };
    init();

    self.edit = function () {
        UserService.updateUser(self.user).then(function (success) {
            self.errorMessage = undefined;
            self.successMessage = 'User was updated successfully.';
            
        }, function (err) {
            $log.error(err);
            self.errorMessage = 'Error occured. Try later.';
        });
    };
}])