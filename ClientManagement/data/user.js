(function (user) {
    
    var User = null;
    
    user.initSchema = function (mongoose) {
        var userSchema = new mongoose.Schema({
            name: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            motto: { type: String },
            passwordHash: { type: String, required: true },
            salt: { type: String, required: true },
            isAdmin: { type: Boolean, required: true }
        });
        
        User = mongoose.model('User', userSchema);
    };

    user.insert = function (u, callback) {
        if (User) {
            var objToSave = new User(u);

            objToSave.save(function (err, obj) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(obj);
                }
            });
        } else {
            callback(null, "Error: schema is not defined.");
        }
    };

    user.getAll = function (callback) {
        if (User) {
            User.find(function (err, users) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(users);
                }
            });
        } else {
            callback(null, "Error: schema is not defined.");
        }
    };

    user.get = function (email, callback) {
        if (User) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(user);
                }
            });
        } else {
            callback(null, "Error: schema is not defined.")
        }
    };

    user.update = function (userToUpdate, callback) {
        User.findOneAndUpdate({ email: userToUpdate.email }, userToUpdate, function (err, updatedUser) {
            if (err) {
                callback(null, err);
            } else {
                callback(updatedUser);
            }
        });
    };

})(module.exports);