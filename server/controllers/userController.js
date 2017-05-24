'use strict'
const User = require('../models/user')
const bCrypt = require('bcrypt');
let methods = {}
const saltRounds = 10;
const jwt = require('jsonwebtoken')

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
    res.json(response)
  })
  .catch(err => {
      res.send(err.message);
  })
} //signup

methods.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .then(response => {
    let pwdHash = req.body.password
    // console.log('Tesss');
    // console.log(bCrypt.compareSync(pwdHash, response.password));
    if (bCrypt.compareSync(pwdHash, response.password)) {
      let data = Object.assign({}, response.toJSON())
        // console.log(data);
        delete data.password

        let token = jwt.sign(data, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })
        console.log('token: ');
        res.json({
            message: 'Login is Successful',
            token,
            username: data.username
        })
    } else {
        res.json({
            message: 'Your password is not match'
        })
    }
  })
  .catch(err => {
    res.send(err)
  })
} //signin

module.exports = methods
