const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  email: String,
  psts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }] 
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)