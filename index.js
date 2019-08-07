const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const PORT = 5000;
dotenv.config();

//DB
mongoose.connect( process.env.DB_CONNECT, {useNewUrlParser : true}, () => {
    console.log("connected to mongoDB");
});

app.use(express.json());
//Routes
const _routedir = path.join(__dirname, 'routes');
const authrouter = require(path.join(_routedir, 'auth.js'));

// Using
app.use('/auth', authrouter);

app.listen(PORT, ()=> {
    console.log("running on ", PORT)
});
