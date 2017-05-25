'use strict'
require('dotenv').config()
const translate = require('yandex-translate')(process.env.YANDEX_KEY);
const helpers = require('../helpers/decode_token')
const userController = require('./userController')
var fs = require('fs');
var objLanguage = JSON.parse(fs.readFileSync('./public/datas/language-codes.json', 'utf8'));
const Translate = require('../models/translate')

var methods = {};

methods.translate = (req, res) => {
  req.headers.token = userController.getToken()
  let decode = helpers.decode_token
  let user = decode(req.headers.token)
  let toLanguage = req.body.languageOption
  console.log(toLanguage);
  translate.translate(req.body.speech, { to: toLanguage }, (err, result) => {
    if(err){
      console.log(err)
      res.render('dashboard', {currentUser: user, result: `sorry i didn't catch it`, getLanguage: objLanguage})
    }
    else {
      let translateResult = result.text[0]
      console.log(translateResult);
      console.log(user);
      res.render('dashboard', {currentUser: user, result: translateResult, getLanguage: objLanguage})
    }
  });
}

methods.create = (req, res) => {
  // var token = userController.getToken()
  // console.log(token);
  // var decoded = helpers.decode_token(token)
  // console.log(decoded);
  // var user_id = decoded._id
  // console.log(user_id);
  // req.body.user_id = user_id
  // console.log(req.body);
  Translate.create(req.body)
  .then(translate => {
    res.send(translate)
  })
  .catch(err => {
    res.send(err)
  })
}

methods.getByUserId = (req, res) => {
  Translate.find({user_id: req.params.user_id})
  .then(translates => {
    console.log(translates);
    res.send(translates)
  })
  .catch(err => {
    res.send(err)
  })
}

methods.deleteById = (req, res) => {
  Translate.findById(req.params.id)
  .then(translate => {
    translate.remove()
    .then(result => {
      res.send(result)
    })
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = methods;
