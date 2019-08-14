const path = require('path');
const __bin = path.join(__dirname, '../bin');
const router = require('express').Router();
const User = require(path.join(__bin, 'models', 'users'));
const Schema = require(path.join(__bin, 'validation'));
const bcrypt = require('bcryptjs');
const _auth = require(path.join(__bin, 'authen'));
const jsonify = require(path.join(__bin, 'jsonify'));
const devlog = require(path.join(__bin, 'log'));

router.post('/login', async (req, res) => {
    let Validation = Schema.LoginValidate(req.body);
    if (Validation.error){
        return jsonify(res, Validation.error.details[0].message, {httpcode : 400});
    }

    let user = await User.findOne({username : Validation.value.username});
    if (!user) {
        return jsonify(res, "user not exist", {httpcode : 400});
    }
    
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) api.ErrHandler(res, 400, Validation.error.details[0].message);

    devlog('"'+user.username + '" requests token successfully');

    jsonify(res, null, {token: _auth.tokenize(user)});
});

module.exports = router;