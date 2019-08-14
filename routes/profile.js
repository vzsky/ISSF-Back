const path = require('path');
const __bin = path.join(__dirname,'..','bin');
const router = require('express').Router();
const _auth = require(path.join(__bin, 'authen'));
const jsonify = require(path.join(__bin, 'jsonify'));

router.get('/', _auth.isStudent, (req, res) => {
    jsonify(res, null, {user:req.user});
});

module.exports = router;