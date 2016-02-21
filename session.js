var db = require('./database');

var session = {};

session.login = function(req, res, next) {
    if(req.session.user.email == req.body.email) {
        res.json('authenticated'); 
    
    } else {
    
        var email       = req.body.email;
        var password    = req.body.password;
        
        db.authenticate(email, password, function(err, user) {
            
            if(err) return console.log(err);

            if(user) {
                req.session.user = {
                    email       : user.email,
                    username    : user.username
                }
                res.redirect('/index');
            } else {
                res.redirect('/login');
            }
        });
    }
};

session.logout = function(req, res, next) {

}

session.authorize = function(req, res, next) {
}

session.signup = function(req, res, next) {
    User.findOne( { $or : [{email : req.body.email}, {username : req.body.username}] } , function (err, result) {
	if (result === null) {
	    db.create(req.body.username, req.body.email, req.body.password, req.body.geolocation);
	    res.status(200).json({});
	}
	else {
	    res.status(409).json({});
	}
    });
}

module.exports = session;
