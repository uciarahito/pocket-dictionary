'use strict'
require('dotenv').config()
const translate = require('yandex-translate')(process.env.YANDEX_KEY);
const helpers = require('../helpers/decode_token')
const userController = require('./userController')
var fs = require('fs');
var objLanguage = JSON.parse(fs.readFileSync('./public/datas/language-codes.json', 'utf8'));

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

module.exports = methods;
