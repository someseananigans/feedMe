const { model, Schema } = require('mongoose')

const Comment = new Schema({
  comment: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Comment', Comment)