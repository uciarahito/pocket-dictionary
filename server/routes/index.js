const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/api/signup', userController.signup)
router.post('/api/signin', userController.signin)

router.get('/login', function(req, res) {
    res.render('login', {error: null})
});
router.get('/register', function(req, res) {
    res.render('register', {success: null})
});

// 'login', {error: null}

module.exports = router
