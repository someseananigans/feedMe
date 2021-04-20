
const router = require('express').Router()
const { Post, User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/posts', (req, res) => {
  Post.find({})
    .populate('comments')
    .populate('user')
    // .populate('user')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.get('/user/posts', passport.authenticate('jwt'), (req, res) => {
  // req.user is the user information that has posts.... > req.user._id is it's id
  // res.json(req.user)
  Post.find({ user: req.user._id })
    .populate('comments')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.post('/post', passport.authenticate('jwt'), (req, res) => {
  const { body, image } = req.body

  Post.create({
    body,
    image,
    user: req.user._id
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => res.json(post))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/post/:post_id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.post_id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/post/:post_id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndRemove(req.params.post_id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router