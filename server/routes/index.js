const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/api/signup', userController.signup)
router.post('/api/signin', userController.signin)

module.exports = router