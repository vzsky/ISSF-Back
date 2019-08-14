const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const devlog = require('./bin/log');

const _auth = require('./bin/authen');

const app = express();
const PORT = 5000;
dotenv.config();

//DB
mongoose.connect( process.env.DB_CONNECT, {useNewUrlParser : true}, () => {
    devlog("connected to mongoDB");
});

app.use(express.json());
//Routes
const _routedir = path.join(__dirname, 'routes');

const authrouter = require(path.join(_routedir, 'auth'));
const profilerouter = require(path.join(_routedir, 'profile'));
const adminrouter = require(path.join(_routedir, 'admin'));

// Using
app.use('/auth', authrouter);
app.use('/profile', profilerouter);
app.use('/admin', _auth.isAdmin, adminrouter);

app.listen(PORT, () => {
    devlog("running on "+PORT);
});
