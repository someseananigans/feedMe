const { model, Schema } = require('mongoose')

const Post = new Schema({
  body: String,
  image: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  liked_by: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  // hashtags: [{
  //   type: String
  // }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Post', Post)