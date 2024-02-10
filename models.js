const itemModel = require('./models/Item')
const transactionModel = require('./models/Transaction')

module.exports = async (Sequelize, sequelize) => {
    return {
        Item: await itemModel(Sequelize, sequelize),
        Transaction: await transactionModel(Sequelize, sequelize)
    }
}