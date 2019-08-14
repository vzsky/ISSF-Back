const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const devlog = require('./bin/log');

const app = express();
const PORT = 5000;
dotenv.config();

//DB
mongoose.connect( process.env.DB_CONNECT, {useNewUrlParser : true}, () => {
    console.log("connected to mongoDB");
    devlog("connected to mongoDB");
});

app.use(express.json());
//Routes
const _routedir = path.join(__dirname, 'routes');

const authrouter = require(path.join(_routedir, 'auth'));
const registrouter = require(path.join(_routedir, 'regist'));
const profilerouter = require(path.join(_routedir, 'profile'));

// Using
app.use('/auth', authrouter);
app.use('/new', registrouter); // This should be remove on production
app.use('/profile', profilerouter);

app.listen(PORT, ()=> {
    console.log("running on ", PORT);
    devlog("running on "+PORT);

});
