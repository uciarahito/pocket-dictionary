'use strict'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema

let userSchema = new Schema({
    name:{
      type: String,
      unique: true,
      required: true
    },
    username: String,
    password: String,
    email: {
      type: String,
      unique: true,
      required: true
    }
}) // userSchema

let User = mongoose.model('User', userSchema)
module.exports = User
