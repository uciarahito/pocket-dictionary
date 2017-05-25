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
router.post('/api/translate', translateController.translate)






router.get('/dashboard', function(req, res) {
  res.render('dashboard', {error: null})
});
router.post('/translate', function(req, res) {
  translate.translate(req.body.speech, { to: 'en' }, (err, result) => {
    res.send(result.text[0]);
  });
});

// 'login', {error: null}


module.exports = router
