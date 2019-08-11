const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function tokenize(user) {
    let token = jwt.sign(
        { _id: user._id },
        process.env.SECRETKEY,
        {expiresIn : "7 days"}
    );
    return token
}

function token_verify(req, res, next) {
    let token = req.header('auth-token');
    if (!token) res.status(400).send("No token");
    try {
        let decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(400).send(e);
    }
}

module.exports = {
    tokenize : tokenize,
    token_verify : token_verify
};