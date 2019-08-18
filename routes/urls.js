const router = require('express').Router()
const path = require('path')

router.use('/login', require('./login'))
router.use('/profile', require('./profile'))

module.exports = router