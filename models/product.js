const Sequelize = require("sequelize")
const db = require("../config/db")

const User = require("./user")

const Product = db.define(
    "product", 
    {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user', // 'fathers' refers to table name
                key: 'id', // 'id' refers to column name in fathers table
            }
        },
        nama_product: {type: Sequelize.STRING},
        satuan: {type: Sequelize.STRING},
        jenis: {type: Sequelize.STRING}
    },
    {
        freezeTableName: true
    }
)

User.hasMany(Product, { foreignKey: 'userId' })
Product.belongsTo(User, { foreignKey: 'userId' })

module.exports = Product