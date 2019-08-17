const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const jsonify = require('./jsonify')
const User = require('./models/users')

dotenv.config()

function tokenize(user) {
    let token = jwt.sign(
        { 
            _id: user._id ,
            permission : user.permission
        },
        process.env.SECRETKEY,
        {expiresIn : "7 days"}
    )
    return token
}

function findUser(decoded) {
    let user = User.findById(decoded._id).populate('project')
    return user
}

function token_verify(req) {
    let token = req.header('auth-token')
    if (!token) throw "No token"
    try {
        let decoded = jwt.verify(token, process.env.SECRETKEY)
        return decoded
    }
    catch (err) {
        throw err
    }
}

async function isStudent (req, res, next) {
    try {
        let decoded = token_verify(req) 
        if (decoded.permission == 0 || decoded.permission == 2) {
            req.user = await findUser(decoded)
            req.user.password = null
            next()
        }
        else {
            throw "Not a student / admin"
        }
    }
    catch (err) {
        jsonify(res, err, {httpcode : 400})
    }
}

async function isTeacher (req, res, next) {
    try {
        let decoded = token_verify(req) 
        if (decoded.permission == 1 || decoded.permission == 2) {
            req.user = await findUser(decoded)
            req.user.password = null
            next()
        }
        else {
            throw "Not a teacher/admin"
        }
    }
    catch (err) {
        jsonify(res, err, {httpcode : 400})
    }
}

async function isUser (req, res, next) {
    try {
        let decoded = token_verify(req) 
        if (decoded.permission >= 0 && decoded.permission <= 2) {
            req.user = await findUser(decoded)
            req.user.password = null
            next()
        }
        else {
            throw "Not a user"
        }
    }
    catch (err) {
        jsonify(res, err, {httpcode : 400})
    }
}

async function isAdmin (req, res, next) {
    try {
        let decoded = token_verify(req) 
        if (decoded.permission == 2) {
            req.user = await findUser(decoded)
            req.user.password = null
            next()
        }
        else {
            throw "Not an admin"
        }
    }
    catch (err) {
        jsonify(res, err, {httpcode : 400})
    }
}

module.exports = {
    tokenize : tokenize,
    isStudent : isStudent,
    isTeacher : isTeacher,
    isUser : isUser,
    isAdmin : isAdmin,
}