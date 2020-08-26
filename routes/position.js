const express = require('express')
const router = express.Router()
const controller = require('../controllers/position')

//localhost:5000/api/position/:category
router.get('/', controller.getByCategoryId)
//localhost:5000/api/position/
router.post('/', controller.create)
//localhost:5000/api/position/:id
router.delete('/:id', controller.remove)
//localhost:5000/api/position/:id
router.patch('/:id', controller.update)


module.exports = router