const path = require('path')
const __bin = path.join(__dirname,'..','bin')
const router = require('express').Router()
const _auth = require(path.join(__bin, 'authen'))
const jsonify = require(path.join(__bin, 'jsonify'))
const devlog = require(path.join(__bin, 'log'))

const BadRequest = {httpcode : 400}

router.get('/', _auth.isUser, (req, res) => {
    if(req.err) {
         return jsonify(res, req.err.name, BadRequest)      
    }
    devlog(`${req.user.username} logged in`)
    return jsonify(res, null, {user:req.user})
})


module.exports = router