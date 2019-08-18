const path = require('path')
const __bin = path.join(__dirname,'..','bin')
const router = require('express').Router()
const _auth = require(path.join(__bin, 'authen'))
const _temp = path.join(__dirname, '..', 'templates');
const devlog = require(path.join(__bin, 'log'))

router.get('/', _auth.isUser, (req, res) => {
    var error = undefined
    var user = undefined
    if(req.err) {
        error = req.err.name     
        devlog(`${error} occurred when logging in`)
    }
    if (req.user) {
        user = req.user
        devlog(`${req.user.username} logged in`)
    }
    return res.render(path.join(_temp, 'profile.ejs'), {title: 'profile', user:user, error:error})
})


module.exports = router