const { model, Schema } = require('mongoose')

const Post = new Schema({
  body: String,
  image: String
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }]
  // likes: Number,
  // hashtags: [{
  //   type: String
  // }],
})

module.exports = model('Post', Post)