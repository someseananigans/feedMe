
const router = require('express').Router()
const { User, Message, ChatRoom } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/chatRooms', (req, res) => {
  ChatRoom.find({})
    .populate(
      {
        path: 'messages',
        model: 'Message',
        select: 'author message _id',
        populate: {
          path: 'author',
          model: 'User',
          select: 'username profile _id'
        }
      }
    )
    // contains object of list users id and list of messages (body, id, author[username, profile, id])
    .then(rooms => res.json(rooms))
    .catch(err => console.log(err))
})

router.get('/chatRoom/:targetUser', passport.authenticate('jwt'), (req, res) => {
  let currentUserChatRooms = req.user.chatRooms
  let sharedRoom = []

  for (chatRoom in currentUserChatRooms) {
    ChatRoom.findbyId(chatRoom)
      .then(room => {
        if (room.users.includes(req.params.targetUser)) {
          sharedRoom.push(room)
        }
      })
  }
  console.log(sharedRoom)
  res.json(sharedRoom)

})

router.get('')


module.exports = router