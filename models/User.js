const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
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