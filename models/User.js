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
    default: 'https://firebasestorage.googleapis.com/v0/b/reinsta-884d1.appspot.com/o/images%2FGram1621549476784?alt=media&token=68106267-555b-49bf-84e5-389213f311a5'
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
  }],
  chatRooms: [{
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)