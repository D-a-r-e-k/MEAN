(function (data) {
    
    var db = require('./database.js');
    var user = require('./user.js');
    
    // all repositories are accessible via one file
    var initData = function () {
        data.user = user
    };

    db.create(function (err) {
        if (!err) {
            initData();
        } else {
            console.log(err);
        }
    });

})(module.exports);