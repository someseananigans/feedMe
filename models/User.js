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
  bio: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  liked_post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)