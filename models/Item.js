const { Sequelize } = require('sequelize')
const { sequelize } = require('../database')

const Item = sequelize.define('Item', {
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    stock: Sequelize.INTEGER,
    status: Sequelize.STRING,
    image: Sequelize.STRING
})

module.exports = Item