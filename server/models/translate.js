'use strict'
const mongoose = require('mongoose')
let Schema = mongoose.Schema

let translateSchema = new Schema({
    from_lang: String,
    from_text: String,
    to_lang: String,
    to_text: String,
    user_id: Schema.Types.ObjectId,
    created_at: {
      type: Date,
      default: Date.now
    },
    image_url: String
}) // translateSchema

let Translate = mongoose.model('Translate', translateSchema)
module.exports = Translate
