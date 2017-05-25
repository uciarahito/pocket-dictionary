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
  translate.translate(req.body.speech, { to: toLanguage }, (err, result) => {
    if(err){
      console.log(err)
      res.render('dashboard', {currentUser: user, result: null, error: `Sorry i didnt catch that`, getLanguage: objLanguage})
    }
    else {
      let translateResult = result
      let translated = result.lang.split('-')
      let translatedFrom = translated[0]
      let translatedTo = translated[1]
      for(let i=0; i<objLanguage.length; i++){
        if(translatedFrom == objLanguage[i].alpha2){
          result.fromLang = objLanguage[i].English
        }
        if(translatedTo == objLanguage[i].alpha2){
          result.toLang = objLanguage[i].English
        }
      }
      console.log(result);
      // console.log(objLanguage);
      res.render('dashboard', {currentUser: user, result: translateResult, error: null, getLanguage: objLanguage})
    }
  });
}

module.exports = methods;
