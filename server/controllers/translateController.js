'use strict'
require('dotenv').config()
const translate = require('yandex-translate')(process.env.YANDEX_KEY);
const helpers = require('../helpers/decode_token')
const userController = require('./userController')
var fs = require('fs');
var objLanguage = JSON.parse(fs.readFileSync('./public/datas/language-codes.json', 'utf8'));
const Translate = require('../models/translate')
const imageUrl = require('../models/imageUrl');

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

methods.create = (req, res) => {
  // var token = userController.getToken()
  // console.log(token);
  // var decoded = helpers.decode_token(token)
  // console.log(decoded);
  // var user_id = decoded._id
  // console.log(user_id);
  // req.body.user_id = user_id
  // console.log(req.body);
  var obj = {
    text:req.body.to_text,
    name: req.body.name
  }
  imageUrl(obj, (err, result) => {
    if (err) res.send(err)
    req.body.image_url = result;
    Translate.create(req.body)
    .then(translate => {
      res.send(translate)
    })
    .catch(err => {
      res.send(err)
    })
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

// methods.getImageUrl = (req, res) => {
//   var obj = {
//     text:req.body.text,
//     name:req.body.name
//   }
//   imageUrl(obj, (err, result) => {
//     if (err) res.send(err)
//     res.send(result)
//   })
// }

module.exports = methods;
