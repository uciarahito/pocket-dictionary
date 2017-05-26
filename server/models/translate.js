'use strict'
const mongoose = require('mongoose')
let Schema = mongoose.Schema

let translateSchema = new Schema({
    from_lang: String,
    from_text: String,
    to_lang: String,
    to_text: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    created_at: {
      type: Date,
      default: Date.now
    }
}) // translateSchema

let Translate = mongoose.model('Translate', translateSchema)
module.exports = Translate
