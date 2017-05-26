const express = require('express');
const router = express.Router();
const TwitterPic = require('twitter-pic');
const request = require('request');
const helpers = require('../helpers/decode_token')
const userController = require('./userController')
require('dotenv').config();


var t = new TwitterPic({
  consumer_key:process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  token:process.env.ACCESS_TOKEN,
  token_secret:process.env.ACCESS_SECRET,
});

module.exports = {
  twitImage: (req, res) => {
    t.update({
        status: `User ${req.body.user_id} post an image`,
        media: request(req.body.image_url)
    },
    function (err, result) {
        if (err) {
            res.send(err);
        }
        res.send(result)
    });
  }
}
