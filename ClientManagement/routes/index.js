(function (api) {

    // all APIs initialization
    var users = require("./usersApi.js");
    
    api.init = function (router) {
        users.init(router);
    };

})(module.exports);