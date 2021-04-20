const router = require('express').Router()
const { Comment, Post } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/comments', (req, res) => {
  Comment.find({})
    // .populate('author')
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
})

router.get('/comments/:post_id', (req, res) => {
  Comment.find({ post: req.params.post_id })
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
})

router.post('/comment/:post_id', passport.authenticate('jwt'), (req, res) => {
  console.log(req)
  Comment.create({
    comment: req.body.comment,
    post: req.params.post_id,
    user: req.user._id
  })
    .then(cmnt => {
      Post.findByIdAndUpdate(req.params.post_id, { $push: { comments: cmnt._id } })
        .then(() => res.json(cmnt))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/comment/:comment_id', passport.authenticate('jwt'), (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/comment/:_id', passport.authenticate('jwt'), (req, res) => {
  Comment.findByIdAndDelete(req.params._id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router