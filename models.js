const itemModel = require('./models/Item')
const transactionModel = require('./models/Transaction')
const scheduleModel = require('./models/Schedule')

module.exports = async (Sequelize, sequelize, mongoose) => {
    return {
        Item: await itemModel(Sequelize, sequelize),
        Transaction: await transactionModel(mongoose),
        Schedule: await scheduleModel(Sequelize, sequelize)
    }
}