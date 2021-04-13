const router = require('express').Router()

router.use('/api', require('./userController.js'))
router.use('/api', require('./postController.js'))
router.use('/api', require('./commentController.js'))

module.exports = router