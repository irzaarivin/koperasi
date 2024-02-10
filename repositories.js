const itemRepositories = require('./repositories/itemRepositories')
const transactionRepositories = require('./repositories/transactionRepositories')

const repositories = async (models) => {
    const { Item, Transaction } = models

    return {
        itemRepositories: await itemRepositories(Item),
        transactionRepositories: await transactionRepositories(Transaction)
    }
}

module.exports = repositories