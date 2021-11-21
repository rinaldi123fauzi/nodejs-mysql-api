const Product = require('../models/product')
const User = require('../models/user');

const product_index = (req, res) => {
    Product.findAll({
        // where: {
        //     id: [46128, 2865, 49569,  1488,   45600,   61991,  1418,  61919,   53326,   61680]
        // }, 
        // // Add order conditions here....
        // order: [
        //     ['id', 'DESC'],
        //     ['name', 'ASC'],
        // ],
        include: [{
            model: User,
            attributes: ['username', 'username']  
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then((result) => {
        res.render('products/index', {title: 'All Blogs', products:result})
    })
    .catch((err) => {
        console.log(err)
    })
}

const product_create_get = (req, res) => {
    User.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then((result) => {
        res.render('products/create', {title: 'Create New Product', users:result})
    })
    .catch((err) => {
        console.log(err)
    })
}

const product_create_post = (req, res) => {
    const product = new Product(req.body)
    product.save()
    .then((result) => {
        res.redirect('/products/index')
    })
    .catch((err) => {
        console.log(err)
    })
}


module.exports = {
    product_index,
    product_create_get,
    product_create_post
}