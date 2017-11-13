const express = require('express');
const router = express.Router();

const request = require('request');

const jwt = require('jsonwebtoken');
const secret = 'my_secret';

router.get('/', function(req, res) {
    let email = req.cookies.email;

    if (email) {
	email = email.split('@')[0];
	res.render('index', { user: email });
    }
    else {
	res.render('index', { user: 'Guest' });
    }
});

router.get('/contact', function(req, res) {
    res.render('contact');
});

let weapons = ['Proton Pack'];
router.get('/weapons', function(req, res) {
    res.render('category', {'equipment': weapons});
});

let traps = ['Ghost Trap']
router.get('/traps', function(req, res) {
    res.render('category', {'equipment': traps});
});

let containments = ['Ecto Containment Unit'];
router.get('/containment', function(req, res) {
    res.render('category', {'equipment': containments});
});

let detections = ['Ghost Detector'];
router.get('/detection', function(req, res) {
    res.render('category', {'equipment': detections});
});

router.get('/cart', isLoggedIn, function(req, res) {
    let cookie = req.cookies.cart;
    if (!cookie) cookie = {cart: []};
    else cookie = JSON.parse(cookie);

    res.cookie('cart', JSON.stringify(cookie));
    res.render('cart', {cart: cookie.cart});

});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/cart/purchase', function(req, res) {
    let cookie = {cart: []};
    console.log("Purchasing items");
    res.cookie('cart', JSON.stringify(cookie));
    res.json(cookie);
});

router.post('/cart/add', function(req, res) {
    const {equipment} = req.body;
    let cookie = req.cookies.cart;
    if (!cookie) cookie = {cart: [equipment]};
    else {
        cookie = JSON.parse(cookie);
        cookie['cart'].push(equipment);
    }


    console.log("success", equipment);
    res.cookie('cart', JSON.stringify(cookie));
    res.json(cookie);
});

router.post('/cart/remove', function(req, res) {
    const {equipment} = req.body;
    let array = JSON.parse(req.cookies.cart)['cart'];
    let index = array.indexOf(equipment);
    array.splice(index, 1);
    let cookie = {cart: array};
    res.cookie('cart', JSON.stringify(cookie));
    res.json(cookie);
});

router.post('/users/signup', function(req, res) {
    console.log("User: ", req.body);
    request.post('http://users/signup', {json: req.body}, function(error, response, body) {
	if (!error && response.statusCode == 200) {
	    console.log(body);
	    res.send("success");
	}
    });
});

router.post('/auth/login', function(req, res) {
    console.log('Logging in', req.body);
    request.post('http://auth/login', {json: req.body}, function(error, response, body) {
	if (!error && response.statusCode == 200) {
	    console.log(body);
	    res.cookie('token', body.token); 
	    res.cookie('email', body.email);
	    res.json(body);
	}
    });
});

function isLoggedIn (req, res, next) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                return res.redirect('/login');
            } else {
                return next();
            }
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
