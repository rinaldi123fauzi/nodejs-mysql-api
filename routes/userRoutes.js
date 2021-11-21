const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

//blog routes
router.get('/', userController.user_index)
router.get('/create', userController.user_create_get)
router.post('/', userController.user_create_post)
router.get('/:id', userController.user_details)
router.get('/update/:id', userController.user_update_get)
router.delete('/:id', userController.user_delete)


module.exports = router;