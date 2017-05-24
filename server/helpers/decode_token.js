let methods = {}
const jwt = require('jsonwebtoken')

methods.decode_token = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded
  } catch(err) {
    return 'Error'
  }
}

module.exports = methods