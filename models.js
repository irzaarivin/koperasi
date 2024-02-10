const itemModel = require('./models/Item')

module.exports = async (Sequelize, sequelize) => {
    return {
        Item: await itemModel
    }
}