const User = require('models/user');

module.exports = function(req, res) {
    console.log("Signing up user", req.body);    
    User.findOne({'email': req.body.email}, function(err, user) {
        if (user) {
	    res.status(401);
            res.send("email taken");
            return console.log("email taken");
        }

        const new_user = new User({email: req.body.email,
                               password: User.generateHash(req.body.password)});

        new_user.save(function(err, new_user) {
            if (err) return console.error(err);
        });

        res.send({"signed_up": "true"});
    });
};
