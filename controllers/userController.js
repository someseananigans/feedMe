const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/users', (req, res) => {
  User.find({})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

router.get('/userlist/:count', (req, res) => {
  User.find({})
    .then(users => res.json(users.slice(0, req.params.count)))
    .catch(err => console.log(err))
})

const getMatches = function (users, toMatch) {
  const res = new Promise((resolve, reject) => {
    let searchResults = []
    for (let i = 0; i < users.length; i++) {
      if (users[i].username.includes(toMatch)) {
        searchResults.push(users[i])
      }
    }
    searchResults.sort((a, b) => (a.createdAt - b.createdAt))
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
        path: 'posts',
        model: 'Post',
        populate: {
          path: 'user',
          model: 'User',
        },
        populate: {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User'
          }
        }
      })

    .then(user => res.json(user))
    .catch(err => console.log(err))
})

router.get('/user', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

router.post('/user/register', (req, res) => {
  let status = {
    name: '',
    email: '',
    username: '',
    password: ''
  }
  const { name, email, username, password } = req.body

  // checks for non empty inputs
  name.length < 1 && (status.name = 'Please Enter Your Full Name')
  username.length < 1 && (status.username = 'Please Enter a Username')
  password.length < 1 && (status.password = 'Please Enter a Pasword')
  email.length < 1 && (status.email = 'Email is Required')
  // checks for valid email
  const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
  !emailValid && (status.email = 'Please Enter a Valid Email')

  let registeredUsers = {
    email: [],
    username: []
  }
  // 
  User.find({})
    .then(users => {
      users.forEach(user => {
        registeredUsers.email.push(user.email)
        registeredUsers.username.push(user.username)
      });
    })
    .catch(err => console.log(err))

  // sets username to be lowercase (all usernames are lowercase)
  let lowerCaseUsername
  if (req.body.username) {
    lowerCaseUsername = req.body.username.toLowerCase()
  }

  if (status.name || status.username || status.password || status.email) {
    res.json({
      status: status,
      message: 'Registration Unsuccessful'
    })
  } else {
    User.register(new User({ name, email, username: lowerCaseUsername }), req.body.password, (err, user) => {
      if (err) {
        // checks if email/username already exists
        registeredUsers.email.indexOf(email) !== -1 && (status.email = "Email is Already in Use")
        registeredUsers.username.indexOf(username) !== -1 && (status.username = "Username is Already in Use")
        res.json({
          status: status,
          err
        })
        return
      }
      res.json({
        data: user,
        status: 200,
        message: 'Successfully Registered User'
      })
    })
  }
})

router.post('/user/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    else if (!user) {
      res.json({
        err: 'Username or Password was Incorrect',
      })
    } else {
      res.json({
        user: user ? jwt.sign({ id: user._id }, process.env.SECRET) : null
      })
    }

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

//  <------------------ Interacting with User ---------------------->

router.put('/user/interaction', passport.authenticate('jwt'), async (req, res) => {
  try {
    if (req.body.type === 'follow') {
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { following: req.body.follow_user_id } }, { "new": true })
      await User.findByIdAndUpdate(req.body.follow_user_id, { $addToSet: { followers: req.user.id } }, { "new": true })
    }
    if (req.body.type === 'following') {
      await User.findByIdAndUpdate(req.user.id, { $pull: { following: req.body.follow_user_id } }, { "new": true })
      await User.findByIdAndUpdate(req.body.follow_user_id, { $pull: { followers: req.user.id } }, { "new": true })
    }
    res.json({
      status: 200,
      message: `Successfully ${req.body.type}ed`
    })
  } catch (err) {
    res.send(err)
    return
  }
})


// <------------------ Interacting with Post ---------------------->

router.put('/post/interaction', passport.authenticate('jwt'), async (req, res) => {

  try {
    if (req.body.type === 'like') {
      await Post.findByIdAndUpdate(req.body.post_id, { $addToSet: { liked_by: req.user._id } }, { "new": true })
      await User.findByIdAndUpdate(req.user._id, { $addToSet: { liked_posts: req.body.post_id } }, { "new": true })
    }
    if (req.body.type === 'unlike') {
      await Post.findByIdAndUpdate(req.body.post_id, { $pull: { liked_by: req.user._id } }, { "new": true })
      await User.findByIdAndUpdate(req.user._id, { $pull: { liked_posts: req.body.post_id } }, { "new": true })
    }
    res.json({
      status: 200,
      message: `Successfully ${req.body.type}ed`
    })
  } catch (err) {
    res.send(err)
    return
  }
})


module.exports = router