const express = require('express');
const app = express();
const port = '80';

const body = require('body-parser');
const cookie = require('cookie-parser');

const jwt = require('jsonwebtoken');

const User = require('models/user');
const mongoose = require('mongodb://users-db/users');

app.use(body.json());
app.use(cookie());

const secret = 'my_secret';

// Route for user auth
app.post('/login', async function(req, res) {
    const {email, password} = req.body;
    console.log('User:', req.body);
    const auth_user = await user.authenticate(email, password);

    let data = {};
    if (auth_user)
    {
	data.token = jwt.sign({sub: auth_user}, secret, {expiresIn: '5m'});
	data.email = email;
	res.cookie('token', data.token);
	res.cookie('email', data.email);
    }
    else
    {
	res.status(401);
	data.error = 'Username or password is invalid';
    }

    res.cookie('token', data.token);
    return res.json(data);
});

app.listen(port, function() {
    console.log('listening on *:', port);
});
