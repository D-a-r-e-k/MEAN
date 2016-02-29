angular.module('frontApp')
       .controller('AdminCtrl', ['UserService', '$log', '$location',
function (UserService, $log, $location) {
    var self = this;

    var init = function () {
        UserService.getUsers().then(function (success) {
            self.users = success.data;
        }, function (err) {
            $log.error(err);
            if (err.status == 401) {
                $location.path('/login');
            } else {
                self.errorMessage = "Error occured. Try later."
            }
        });
    };
    init();
}])