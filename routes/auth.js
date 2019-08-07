const router = require('express').Router();
const User = require('../models/users');
const Schema = require('../models/validation');
const bcrypt = require('bcryptjs')


router.post('/register', async (req, res) => {

    let Validation = Schema.RegistValidate(req.body);
    if (Validation.error){
        return res.status(400).send(Validation.error.details[0].message);
    }
    let valid = Validation.value;

    let UserExist = await User.findOne({username : valid.username});
    if (UserExist) {
        return res.status(400).send("username already used");
    }

    //hasing
    let salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(valid.password, salt);

    let user = new User({
        username: valid.username,
        password : hashedPass,
    });

    try {
        let savedUser = await user.save();
        res.send(savedUser);
    }catch (e){
        return res.status(400).send(e);
    }
});

router.post('/login', async (req, res) => {
    let Validation = Schema.LoginValidate(req.body);
    if (Validation.error){
        return res.status(400).send(Validation.error.details[0].message);
    }

    let user = await User.findOne({username : req.body.username});
    if (!user) {
        return res.status(400).send("user not existed");
    }
    
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    res.send("logged in");
});

module.exports = router;