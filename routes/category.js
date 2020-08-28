const express = require('express')
const router = express.Router()
const controller = require('../controllers/category')

const passport = require('passport')

// localhost:5000/api/category
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
// localhost:5000/api/category/:id
router.get('/:id', controller.getByCategoryId)
// localhost:5000/api/category/:id
router.delete('/:id', controller.remove)
// localhost:5000/api/category/
router.post('/', controller.create)
// localhost:5000/api/category/:id
router.patch('/:id', controller.update)


module.exports = router