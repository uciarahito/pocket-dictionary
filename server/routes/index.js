const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const translateController = require('../controllers/translateController')
require('dotenv').config()
const translate = require('yandex-translate')(process.env.YANDEX_KEY);

router.get('/', userController.signin);
router.get('/register', userController.signupPage);
router.post('/register', userController.signup);
router.get('/login', userController.signinPage);
router.post('/login', userController.signin);
router.post('/api/translate', translateController.translate);
router.get('/logout', userController.logout);
router.get('/dashboard', userController.auth , userController.dashboard);
router.post('/dashboard', translateController.translate);
router.post('/translate', translateController.create);
router.get('/api/translate/:user_id', translateController.getByUserId);
router.delete('/api/translate/:id', translateController.deleteById)
//router.post('/image', translateController.getImageUrl);


// 'login', {error: null}


module.exports = router
