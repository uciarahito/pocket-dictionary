'use strict'
const User = require('../models/user')
const bCrypt = require('bcrypt');
let methods = {}
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const helpers = require('../helpers/decode_token')
require('dotenv').config()
var fs = require('fs');
var objLanguage = JSON.parse(fs.readFileSync('./public/datas/language-codes.json', 'utf8'));

var userToken

methods.signupPage = (req, res) => {
  res.render('register', {success: null, error: null})
}

methods.signup = (req, res) => {
  let pwd = req.body.password
  let salt = bCrypt.genSaltSync(saltRounds)
  let generateHash = bCrypt.hashSync(pwd, salt)
  User.create({
    name: req.body.name,
    username: req.body.username,
    password: generateHash,
    email: req.body.email
  })
  .then(response => {
    console.log(response);
    console.log('Signup data user success');
    res.redirect('/login')
  })
  .catch(err => {
      console.log(err);
      if(/name/.test(err.message)){
        console.log('username');
        res.render('register', {success: null, error: 'username already taken'})
      }
      if(/email/.test(err.message)){
        console.log('username');
        res.render('register', {success: null, error: 'email is already registered'})
      }
      res.send(err.message); // Ini perlu render custom paga ga?
  })
} //signup

methods.signinPage = (req, res) => {
  res.render('login', {error: null})
}

methods.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .then(response => {
    console.log(response);
    let pwdHash = req.body.password
    // console.log('Tesss');
    // console.log(bCrypt.compareSync(pwdHash, response.password));
    if (response == null){
      res.render('login', {error: 'username or password is invalid'})
    } else {
      if (bCrypt.compareSync(pwdHash, response.password)) {
        let data = Object.assign({}, response.toJSON())
        // console.log(data);
        delete data.password

        var token = jwt.sign(data, process.env.SECRET_KEY, {
          expiresIn: '1h'
        })
        userToken = token
        //res.redirect('/dashboard')
        res.send({token, data})
      } else {
        res.json({
          message: 'Your password is not match'
        })
      }
    }
  })
  .catch(err => {
    console.log(err);
  })
} //signin

methods.auth = (req, res, next) => {
  if(userToken == null){
    res.redirect('/login')
  } else {
    req.headers.token = userToken
    next()
  }
}

methods.getToken = () => {
  var token = userToken
  return token
}

methods.dashboard = (req, res) => {
    let decode = helpers.decode_token
    let user = decode(req.headers.token)
    // console.log(user);
    res.render('dashboard', {currentUser: user, result: null, error: null, getLanguage: objLanguage})
  }

methods.logout = (req, res) => {
  userToken = null
  res.redirect('/login')
}

module.exports = methods
