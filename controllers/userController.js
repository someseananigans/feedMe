const router = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// only for testing purposes
router.get('/users', (req, res) => {
  User.find({})
  .then(users => res.json(users))
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

module.exports = router