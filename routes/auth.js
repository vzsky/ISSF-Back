const path = require('path');
const __bin = path.join(__dirname, '../bin');
const router = require('express').Router();
const User = require(path.join(__bin, 'users'));
const Schema = require(path.join(__bin, 'validation'));
const bcrypt = require('bcryptjs');
const _auth = require(path.join(__bin, 'authen'));
const jsonify = require(path.join(__bin, 'jsonify'));



router.post('/register', async (req, res) => {

    let Validation = Schema.RegistValidate(req.body);
    if (Validation.error){
        return jsonify(res, Validation.error.details[0].message, {httpcode : 400});
    }
    let valid = Validation.value;

    let UserExist = await User.findOne({username : valid.username});
    if (UserExist) {
        return jsonify(res, "username already used", {httpcode : 400});
    }

    //hasing
    let salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(valid.password, salt);

    let user = new User({
        username: valid.username,
        password : hashedPass,
        permission : valid.permission,
    });

    try {
        let savedUser = await user.save();
        jsonify(res, null, {user: savedUser});
    }catch (e){
        return jsonify(res, e, {httpcode : 400});
    }
});

router.post('/login', async (req, res) => {
    let Validation = Schema.LoginValidate(req.body);
    if (Validation.error){
        return jsonify(res, Validation.error.details[0].message, {httpcode : 400});
    }

    let user = await User.findOne({username : req.body.username});
    if (!user) {
        return jsonify(res, "user not exist", {httpcode : 400});
    }
    
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) api.ErrHandler(res, 400, Validation.error.details[0].message);

    jsonify(res, null, {token: _auth.tokenize(user)});
});

router.get('/token_test', _auth.isTeacher ,(req, res) => {
    jsonify(res, null, {user:req.user});
});

module.exports = router;