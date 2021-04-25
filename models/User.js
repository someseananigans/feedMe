const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  profile: {
    type: String,
    default: 'https://firebasestorage.googleapis.com/v0/b/reinsta-884d1.appspot.com/o/images%2Fpexels-ann-h-1762851.jpg?alt=media&token=35072ee2-e6c7-4406-93db-92ad796a05d7'
  },
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