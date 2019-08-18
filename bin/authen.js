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

async function hasPermission (req, permission, permissionErr) {
    try {
        let decoded = token_verify(req) 
        if (permission(decoded.permission)) {
            req.user = await findUser(decoded)
            req.user.password = null
            return true
        }
        else {
            throw permissionErr
        }
    }
    catch (err) {
        req.err = err
        return false
    }
}

async function isStudent (req, res, next) {
    p = (usr) => (usr == 0 || usr == 2)?true:false
    err = new Error("Not a Student")
    await hasPermission(req, p, err)
    next()
}

async function isTeacher (req, res, next) {
    p = (usr) => (usr == 1 || usr == 2)?true:false
    err = new Error("Not a Teacher")
    await hasPermission(req, p, err)
    next()
}

async function isUser (req, res, next) {
    p = (usr) => (usr == 0 || usr == 1 || usr == 2)?true:false
    err = new Error("Not a User")
    await hasPermission(req, p, err)
    next()
}

async function isAdmin(req, res, next) {
    p = (usr) => (usr == 2)?true:false
    err = new Error("Not an Admin")
    await hasPermission(req, p, err)
    next()
}

module.exports = {
    tokenize : tokenize,
    isStudent : isStudent,
    isTeacher : isTeacher,
    isUser : isUser,
    isAdmin : isAdmin,
}