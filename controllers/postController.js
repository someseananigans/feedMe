
const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/posts', (req, res) => {
  Post.find({})
    .populate(
      {
        path: 'comments',
        model: 'Comment',
        select: 'comment user _id',
        populate: {
          path: 'user',
          model: 'User',
          select: 'username profile _id'
        }
      }
    )
    .populate(
      {
        path: 'user',
        model: 'User',
        select: 'username profile _id'
      }
    )
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.get('/posts/:postId', (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate(
      {
        path: 'comments',
        model: 'Comment',
        select: 'comment user _id',
        populate: {
          path: 'user',
          model: 'User',
          select: 'username profile _id'
        }
      }
    )
    .populate(
      {
        path: 'user',
        model: 'User',
        select: 'username profile _id'
      }
    )
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.get('/user/posts', passport.authenticate('jwt'), (req, res) => {
  // req.user is the user information that has posts.... > req.user._id is it's id
  // res.json(req.user)
  Post.find({ user: req.user._id })
    .populate('comments')
    .populate(
      {
        path: 'comments',
        model: 'Comment',
        select: 'comment user _id',
        populate: {
          path: 'user',
          model: 'User',
          select: 'username profile _id'
        }
      }
    )
    .populate(
      {
        path: 'user',
        model: 'User',
        select: 'username profile _id'
      }
    )
    .then(posts => {
      res.json(posts)
      Comment.find({})
        .populate({
          path: 'user',
          model: 'User',
        })
        .then(comments => res.json(comments))
        .catch(err => console.log(err))

    })


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

// <------------------ SearchFeed ---------------------->

// get all posts from following by most recent
router.get('/post/following', passport.authenticate('jwt'), async (req, res) => {
  let followingUsers = req.user.following
  let followedPosts = []
  let feed = []
  let allFollowPosts = []


  for (followedUser of followingUsers) {
    const userData = await User.findById(followedUser).populate({
      path: 'posts',
      model: 'Post',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    followedPosts.push(userData.posts)
  }

  for (posts of followedPosts) {
    for (post of posts) {
      feed.push(post)
    }
  }

  feed.sort((a, b) => (b.created_On - a.created_On))
  res.json(feed)


})

router.get('/post/liked', passport.authenticate('jwt'), async (req, res) => {
  let likedPosts = req.user.liked_post

  let allLikedPosts = []

  for (post of likedPosts) {
    const postData = await Post.findById(post).populate(
      {
        path: 'user',
        model: 'User',
        select: 'username profile _id'
      }
    )
      .populate(
        {
          path: 'comments',
          model: 'Comment',
          select: 'comment user _id',
          populate: {
            path: 'user',
            model: 'User',
            select: 'username profile _id'
          }
        }
      )


    allLikedPosts.push(postData)
  }

  allLikedPosts.sort((a, b) => (b.created_On - a.created_On))
  res.json(allLikedPosts)


})


module.exports = router