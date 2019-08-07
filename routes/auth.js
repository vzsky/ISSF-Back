const router = require('express').Router();
const user = require('../models/users.js');

router.post('/register', async (req, res) => {
    const User = new user({
        name: req.body.name,
        password : req.body.password,
    });
    try {
        const savedUser = await User.save();
        res.send(savedUser);
    }catch (e){
        res.status(400).send(e);
    }
    res.send("Register")
});

router.post('/login', (req, res) => {
    res.send("Login")
});

module.exports = router;