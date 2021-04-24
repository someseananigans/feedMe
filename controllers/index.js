const router = require('express').Router()
const passport = require('passport')
const { Comment, Post, User } = require('../models')

router.use('/api', require('./userController.js'))
router.use('/api', require('./postController.js'))
router.use('/api', require('./commentController.js'))

router.post('/user/api/comment/:post_id', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    comment: req.body.comment,
    post: req.params.post_id,
    user: req.user._id
  })
    .then(cmnt => {
      Post.findByIdAndUpdate(req.params.post_id, { $push: { comments: cmnt._id } })
        .populate(
          {
            path: 'user',
            model: 'User'
          }
        )
        .then(() => res.json(cmnt))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router