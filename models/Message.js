const { model, Schema } = require('mongoose')

const Message = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String,
  room: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = model('Message', Message)