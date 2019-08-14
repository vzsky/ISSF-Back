const path = require('path');
const __bin = path.join(__dirname,'..','bin');
const router = require('express').Router();
const _auth = require(path.join(__bin, 'authen'));
const jsonify = require(path.join(__bin, 'jsonify'));
const devlog = require(path.join(__bin, 'log'));

router.get('/', _auth.isUser, (req, res) => {
    devlog('"' + req.user.username + '" logged in');
    jsonify(res, null, {user:req.user});
});

module.exports = router;