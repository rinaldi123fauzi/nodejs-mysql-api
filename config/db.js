const sequelize = require("sequelize")
const db = new sequelize("nodejs", "root", "", {
    dialect: "mysql"
})

db.sync({})

module.exports = db