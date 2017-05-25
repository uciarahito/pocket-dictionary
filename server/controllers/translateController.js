require('dotenv').config()
const translate = require('yandex-translate')(process.env.YANDEX_KEY);

var methods = {};

methods.translate = (req, res) => {
  translate.translate(req.body.words, { to: req.body.language }, (err, result) => {
    res.send(result.text[0]);
  });
}

module.exports = methods;
