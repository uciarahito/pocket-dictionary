'use strict'
const express = require('express');
const router = express.Router();
const TwitterPic = require('twitter-pic');
const request = require('request');
const Translate = require('../models/translate');
const helpers = require('../helpers/decode_token')
require('dotenv').config();


var t = new TwitterPic({
  consumer_key:process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  token:process.env.ACCESS_TOKEN,
  token_secret:process.env.ACCESS_SECRET,
});

module.exports = {
  twitImage: (req, res) => {
    let decode = helpers.decode_token
    let user = decode(req.headers.token)

    let id = req.params.id
    Translate.findById(req.params.id)
    .populate('user_id')
    .exec((err,result) => {
      if (err) res.send(err)
      console.log(result);
      t.update({
          status: `${result.user_id.name} posted an image...`,

          media: request(result.image_url)
      }, (err, result2) => {
          if (err) {
              res.send(err);
          }
          res.render('share', {currentUser: user, getLibrary: result, success: 'Your pic has been tweet to our fanpage! Thankyou'})
          // res.send(result)
      });
    })
  }
}
