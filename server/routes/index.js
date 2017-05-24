const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const translateController = require('../controllers/translateController')

router.post('/api/signup', userController.signup)
router.post('/api/signin', userController.signin)
router.post('/api/translate', translateController.translate)

module.exports = router
