(function (db) {
    
    var mongoose = require('mongoose');
    var dbUrl = 'mongodb://localhost:27017/users';
    
    //Models
    var user = require('./user.js');

    db.create = function (callback) {
        
        var connection = mongoose.connection;
        
        connection.on('error', function (err) {
            callback(err);
        });
        
        connection.once('open', function () {
            
            user.initSchema(mongoose);
            callback(null);
        });

        mongoose.connect(dbUrl);
    }

})(module.exports);

