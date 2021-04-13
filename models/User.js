const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  username: String,
  email: String,
  profile: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }] 
  // following: []
  // followers: []
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)