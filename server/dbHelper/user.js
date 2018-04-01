/**

 */
const mongoose = require('mongoose')
require('./db')
const userSchema = mongoose.Schema({
  username: '',
  email: '',
  password: '',
  token: ''
})

module.exports = {
  User: mongoose.model('user', userSchema)
}
