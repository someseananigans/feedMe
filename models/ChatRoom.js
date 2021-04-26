const { model, Schema } = require('mongoose')

const ChatRoom = new Schema({
  name: {
    type: String,
    unique: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
})

module.exports = model('ChatRoom', ChatRoom)