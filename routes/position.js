const express = require('express')
const router = express.Router()
const controller = require('../controllers/position')

const passport = require('passport')

//localhost:5000/api/position/:category
router.get('/', passport.authenticate('jwt', {session: false}), controller.getByCategoryId)
//localhost:5000/api/position/
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
//localhost:5000/api/position/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
//localhost:5000/api/position/:id
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)


module.exports = router