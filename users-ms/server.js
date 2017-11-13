const express = require('express');
const app = express();
const port = '80';

const new_user = require('./new_user');

const mongoose = require('mongoose');
mongoose.connect('mongodb://users-db/users');

const body = require('body-parser');
app.use(body.json());

app.post('/signup', new_user);

app.listen(port, function () {
    console.log('listening on *:', port);
});

