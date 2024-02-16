const itemRepositories = require('./repositories/itemRepositories')
const transactionRepositories = require('./repositories/transactionRepositories')
const scheduleRepositories = require('./repositories/scheduleRepositories')

const repositories = async (models) => {
    const { Item, Transaction, Schedule } = models

    return {
        itemRepositories: await itemRepositories(Item),
        transactionRepositories: await transactionRepositories(Transaction),
        scheduleRepositories: await scheduleRepositories(Schedule)
    }
}

module.exports = repositories