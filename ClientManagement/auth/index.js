(function (auth) {
    
    var data = require("../data");
    var hasher = require("./hasher");
    var jwt = require("jsonwebtoken");
    
    var TOKEN_EXPIRATION = 60;
    var SECRET_TOKEN = 'aMdoeb5ed87zorRdkD6greDML81DcnrzeSD648ferFejmplx';
    
    var getToken = function (headers) {
        if (headers && headers.authorization) {
            return jwt.verify(headers.authorization, SECRET_TOKEN);;
        }
        else {
            return null;
        }
    };
    
    var userVerify = function (email, password, next) {
        data.user.get(email, function (user, err) {
            if (!err && user) {
                var testHash = hasher.computeHash(password, user.salt);
                if (testHash === user.passwordHash) {
                    next(null, user);
                    return;
                }
            }
            next({ message: "Invalid Credentials." }, null);
        });
    }
    
    auth.hasAdminPermission = function (req, res, next) {
        var token = getToken(req.headers);
        
        if (token && token._doc.isAdmin) {
            next();
        } else {
            return res.status(401).end();
        }
    };
    
    auth.checkManageUserPermission = function (req, res, next) {
        var token = getToken(req.headers);
        
        if (token && (token._doc.email == req.params.email || token._doc.isAdmin || 
                        token._doc.email == req.body.email)) {
            next();
        } else {
            return res.status(401).end();
        }
    };

    auth.init = function (app) {

        app.post("/api/login", function (req, res) {
            
            userVerify(req.body.email, req.body.password, function (err, user) {
                if (err) {
                    res.send(401, err.message);
                } else {
                    var token = jwt.sign(user, SECRET_TOKEN, { expiresInMinutes: TOKEN_EXPIRATION });

                    return res.json({ user: user, token: token });
                }
            });
        });

        app.post("/api/register", function (req, res) {
            
            var salt = hasher.createSalt();
            
            var user = {
                name: req.body.name,
                lastName: req.body.lastName,
                isAdmin: req.body.isAdmin,
                email: req.body.email,
                passwordHash: hasher.computeHash(req.body.password, salt),
                salt: salt
            };
            
            data.user.insert(user, function (insertedObj, err) {
                if (err) {
                    res.send(500, "Failed to register a user.");
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(201, insertedObj);
                }
            });
        });
    };

})(module.exports);