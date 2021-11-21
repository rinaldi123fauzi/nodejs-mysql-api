const User = require('../models/user')

const user_index = (req, res) => {
    User.findAll({
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

module.exports = {
    user_index
}