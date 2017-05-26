const express = require('express');
const router = express.Router();
const TwitterPic = require('twitter-pic');
const request = require('request');
const Translate = require('../models/translate');
require('dotenv').config();


var t = new TwitterPic({
  consumer_key:process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  token:process.env.ACCESS_TOKEN,
  token_secret:process.env.ACCESS_SECRET,
});

module.exports = {
  twitImage: (req, res) => {
    Translate.findById(req.params.id)
    .populate('user_id')
    .exec((err,result) => {
      if (err) res.send(err)
      console.log(result);
      t.update({
          status: `User ${result.user_id.name} post an image`,
          media: request(result.image_url)
      }, (err, result) => {
          if (err) {
              res.send(err);
          }
          res.send(result)
      });
    })
  }
}
