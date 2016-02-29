(function (usersApi) {
    
    var data = require("../data");
    var auth = require("../auth");

    usersApi.init = function (router) {
        
        router.get('/api/users', auth.hasAdminPermission, function (req, res) {
            data.user.getAll(function (users, err) {
                if (!err) {
                    res.set("Content-Type", "application/json");
                    res.send(users);
                } else {
                    res.send(500, err);
                }
            });
        });
        
        router.post('/api/user', auth.checkManageUserPermission, function (req, res) {
            data.user.update(req.body, function (updatedUser, err) {
                if (!err) {
                    res.send(200);
                } else {
                    res.send(500, err);
                }
            });
        });

        router.get('/api/user/:email', auth.checkManageUserPermission, function (req, res) {
            data.user.get(req.params.email, function (user, err) {
                if (!err) {
                    res.set("Content-Type", "application/json");
                    res.send(user);
                } else {
                    res.send(404, err);
                }
            });
        });
    }
})(module.exports);