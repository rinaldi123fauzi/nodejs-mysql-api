const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

//blog routes
router.get('/index', productController.product_index)
router.get('/create', productController.product_create_get)
router.post('/', productController.product_create_post)


module.exports = router;