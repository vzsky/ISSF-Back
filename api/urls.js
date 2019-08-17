const _auth = require('../bin/authen')
const router = require('express').Router()
const path = require('path')

// Using API
const authrouter = require(path.join(__dirname, 'auth'))
const profilerouter = require(path.join(__dirname, 'profile'))
const adminrouter = require(path.join(__dirname, 'admin'))

router.use('/auth', authrouter)
router.use('/profile', profilerouter)
router.use('/admin', _auth.isAdmin, adminrouter)

module.exports = router