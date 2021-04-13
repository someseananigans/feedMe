const { model, Schema } = require('mongoose')

const Comment = new Schema({
  comment: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Comment', Comment)