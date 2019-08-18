const router = require('express').Router()
const path = require('path')
const _temp = path.join(__dirname, '..', 'templates')

router.get('/', (req, res) => {
    res.render(path.join(_temp, 'admin'), {'title':'admin'})
})

module.exports = router