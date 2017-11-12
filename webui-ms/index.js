const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
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

router.get('/cart', function(req, res) {
    let cookie = req.cookies.cart;
    if (!cookie) cookie = {cart: []};
    else cookie = JSON.parse(cookie);

    res.cookie('cart', JSON.stringify(cookie));
    res.render('cart', {cart: cookie.cart});

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

module.exports = router;
