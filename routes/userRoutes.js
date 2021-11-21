const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

//blog routes
router.get('/', userController.user_index)

module.exports = router;