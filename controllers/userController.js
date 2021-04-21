const router = require('express').Router()
const { User, Post } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// only for testing purposes
router.get('/users', (req, res) => {
  User.find({})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

const getMatches = async function (users, username) {
  const res = await new Promise((resolve, reject) => {
    let searchResults = []
    for (let i = 0; i < users.length; i++){
      if (users[i].username.includes(username)) {
        searchResults.push(users[i])
      }
    }
    searchResults.sort((a,b) => (a.createdAt-b.createdAt))
    resolve(searchResults)
  })
  return res
}

router.get('/users/search/:username', passport.authenticate('jwt'), (req, res) => {
  User.find({})
  .then(users => getMatches(users, req.params.username))
  .then(users => res.json(users))
  .catch(err => console.log(err))
})

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
  .populate(
    {
      path:'posts', 
      model: 'Post',
      populate: {
        path: 'user',
        model: 'User',
        select: 'username profile _id'
      }
    })
  .then(user => res.json(user))
  .catch(err => console.log(err))
})

router.get('/user', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

router.post('/user/register', (req, res) => {
  const { name, email, username } = req.body
  User.register(new User({ name, email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/user/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }

    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

router.put('/user', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/user', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndRemove(req.user.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// <------------------ Interacting with Post ---------------------->

router.put('/post/interaction', passport.authenticate('jwt'), async (req, res) => {

  try {
    if (req.body.type === 'like') {
      await Post.findByIdAndUpdate(req.body.post_id, { $addToSet: { liked_by: req.body.user_id } }, { "new": true })
      await User.findByIdAndUpdate(req.body.user_id, { $addToSet: { liked_posts: req.body.post_id } }, { "new": true })
      res.sendStatus(200)
    }
    if (req.body.type === 'unlike') {
      await Post.findByIdAndUpdate(req.body.post_id, { $pull: { liked_by: req.body.user_id } }, { "new": true })
      await User.findByIdAndUpdate(req.body.user_id, { $pull: { liked_posts: req.body.post_id } }, { "new": true })
      res.sendStatus(200)
    }
  } catch (err) {
    res.send(err)
    return
  }

})

module.exports = router