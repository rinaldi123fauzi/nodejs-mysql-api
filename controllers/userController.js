const User = require('../models/user')

const user_index = (req, res) => {
    User.findAll({
        // where: {
        //     id: [46128, 2865, 49569,  1488,   45600,   61991,  1418,  61919,   53326,   61680]
        // }, 
        // // Add order conditions here....
        // order: [
        //     ['id', 'DESC'],
        //     ['name', 'ASC'],
        // ],
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then((result) => {
        res.render('users/index', {title: 'All Blogs', users:result})
    })
    .catch((err) => {
        console.log(err)
    })
}

const user_details = (req, res) => {
    const id = req.params.id
    User.findOne({ 
        where: {id:id} 
    })
    .then(result => {
        res.render('users/details', { user: result, title: 'Blog Details'} )
    })
    .catch(err => {
        res.status(404).render('404', {title: '404'})
    })
}

const user_create_get = (req, res) => {
    res.render('users/create', {title: 'Create New User'})
}

const user_create_post = (req, res) => {
    const {id_update, username, email, password} = req.body
    if (id_update){
        User.update({
            username,
            email,
            password
        }, {where: {id:id_update} })
        .then((result) => {
            res.redirect('/users')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    else{
        const user = new User(req.body)
        user.save()
        .then((result) => {
            res.redirect('/users')
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

const user_delete = (req, res) => {
    const id = req.params.id

    User.destroy({
        where: {id:id}
    })
    .then(result => {
        res.json({redirect: '/users'})
    })
    .catch(err => {
        console.log(err)
    })
}

const user_update_get = (req, res) => {
    const id = req.params.id

    User.findOne({
        where: {id:id}
    })
    .then(result => {
        res.render('users/update', { user: result, title: 'User Edit'} )
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    user_index,
    user_details,
    user_create_get,
    user_create_post,
    user_delete,
    user_update_get
}