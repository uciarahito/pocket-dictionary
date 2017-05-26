'use strict'
require('dotenv').config()
const translate = require('yandex-translate')(process.env.YANDEX_KEY);
const helpers = require('../helpers/decode_token')
const userController = require('./userController')
const imageUrl = require('../models/imageUrl');
var fs = require('fs');
var objLanguage = JSON.parse(fs.readFileSync('./public/datas/language-codes.json', 'utf8'));
const Translate = require('../models/translate')
var translateObj = {}

var methods = {};

methods.translate = (req, res) => {
  let decode = helpers.decode_token
  console.log('ini decode ', decode);
  let user = decode(req.headers.token)
  console.log('ini user ', user);
  // console.log(user);
  // res.render('dashboard', {currentUser: user, result: null, error: null, getLanguage: objLanguage})
  var user_id = user._id
  console.log('ini user id kedua ', user_id);
  let toLanguage = req.body.languageOption
  translate.translate(req.body.speech, { to: toLanguage }, (err, result) => {
    if(err){
      console.log(err)
      res.render('dashboard', {currentUser: user, result: null, error: `Sorry i didnt catch that`, getLanguage: objLanguage, getLibrary: translates})
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
      result.inputLang = req.body.speech
      translateObj.from_lang = result.fromLang
      translateObj.to_lang = result.toLang
      translateObj.from_text = result.inputLang
      translateObj.to_text= result.text[0]
      console.log(translateObj);
      Translate.find({user_id: user_id})
      .then(translates => {
        console.log('ini list kedua',translates);
        res.render('dashboard', {currentUser: user, result: translateResult, error: null, getLanguage: objLanguage, getLibrary: translates})
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
      // console.log(objLanguage);
    }
  });
}

methods.create = (req, res) => {
  var token = userController.getToken()
  var decoded = helpers.decode_token(token)
  var user_id = decoded._id
  translateObj.user_id = user_id
  var obj = {
    from_lang:translateObj.from_lang,
    from_text:translateObj.from_text,
    to_lang:translateObj.to_lang,
    to_text:translateObj.to_text
  }
  imageUrl(obj, (err, result) => {
    if (err) res.send(err)
    else {
      // console.log(result);
      translateObj.image_url = result
      // console.log(translateObj);
      Translate.create(translateObj)
      .then(translate => {
        console.log(translate);
        res.redirect('/dashboard')
      })
      .catch(err => {
        res.send(err)
      })
    }
  })
}

methods.getByUserId = (req, res) => {
  let decode = helpers.decode_token
  let user = decode(req.headers.token)
  // console.log(user);

  var user_id = user._id
  console.log('ini user id pertama ', user_id);
  Translate.find({user_id: user_id})
  .then(translates => {
    console.log('ini list pertama',translates);
    res.render('dashboard', {currentUser: user, result: null, error: null, getLanguage: objLanguage, getLibrary: translates})
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
      // res.send(result)
      res.redirect('/dashboard')
    })
  })
  .catch(err => {
    res.send(err)
  })
}

methods.share = (req, res) => {
  let decode = helpers.decode_token
  let user = decode(req.headers.token)

  let id = req.params.id
  Translate.findById(id)
  .then(translate => {
    console.log(translate);
    res.render('share', {currentUser: user, getLibrary: translate, success: null})
  })
  .catch(err => {console.log(err);})
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
