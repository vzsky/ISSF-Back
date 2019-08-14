const path = require('path');
const router = require('express').Router();
const admin = require(path.join(__dirname, '..', 'bin', 'admin'));

router.post('/create/user', (req, res) => {
    admin.userRegist(req, res);
});

router.post('/create/project', (req, res) => {
    admin.projectRegist(req, res);
});

module.exports = router;