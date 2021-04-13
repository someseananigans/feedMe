const router = require('express').Router()
const { Comment , Post } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/comments', (req, res) => {
  Comment.find({})
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.post('/comment', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    comment: req.body.comment,
    user: req.user._id
  })
    .then(comment => {
      Post.findByIdAndUpdate(req.user._id, { $push: { comments: comment._id } })
        .then(() => res.json(comment))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/comment/:_id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params._id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/comment/:_id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndDelete(req.params._id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router