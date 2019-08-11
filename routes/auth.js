const path = require('path');
const __bin = path.join(__dirname, '../bin');
const router = require('express').Router();
const User = require(path.join(__bin, 'users'));
const Schema = require(path.join(__bin, 'validation'));
const bcrypt = require('bcryptjs');
const authentication = require(path.join(__bin, 'authen'));
const api = require(path.join(__bin, 'apiview'));

const isAuthenicated = authentication.token_verify;


router.post('/register', async (req, res) => {

    let Validation = Schema.RegistValidate(req.body);
    if (Validation.error){
        return api.ErrHandler(res, 400, Validation.error.details[0].message);
    }
    let valid = Validation.value;

    let UserExist = await User.findOne({username : valid.username});
    if (UserExist) {
        return api.ErrHandler(res, 400, "username already used");
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
        api.OkHandler(res, "user", savedUser);
    }catch (e){
        return api.ErrHandler(res, 400, e);
    }
});

router.post('/login', async (req, res) => {
    let Validation = Schema.LoginValidate(req.body);
    if (Validation.error){
        return api.ErrHandler(res, 400, Validation.error.details[0].message);
    }

    let user = await User.findOne({username : req.body.username});
    if (!user) {
        api.ErrHandler(res, 400, "user not exist");
    }
    
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) api.ErrHandler(res, 400, Validation.error.details[0].message);

    api.OkHandler(res, "token", authentication.tokenize(user));
});

router.get('/token_test', isAuthenicated ,(req, res) => {
    api.OkHandler(res, "message", "token verified");
});

module.exports = router;