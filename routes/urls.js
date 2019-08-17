const router = require('express').Router()
const path = require('path')
const _tempdir = path.join(__dirname, '..', 'templates')

router.get('/login', (req, res) => {
    res.render(path.join(_tempdir, 'login'), {'title':'login'})
})

module.exports = router