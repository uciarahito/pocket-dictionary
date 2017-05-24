const mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String
}) // userSchema

let User = mongoose.model('User', userSchema)
module.exports = User