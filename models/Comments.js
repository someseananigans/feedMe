const { model, Schema } = require('mongoose')

const Comments = new Schema({
  comment: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Comments', Comments)