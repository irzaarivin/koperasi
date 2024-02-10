// ITEMS HANDLERS
const createItem = require('./handlers/item/create')
const getItems = require('./handlers/item/get')
const updateItem = require('./handlers/item/update')
const updateStockItem = require('./handlers/item/update-stock')
const deleteItem = require('./handlers/item/delete')

// TRANSACTION HANDLERS
const createTransaction = require('./handlers/transaction/create')
const getTransactions = require('./handlers/transaction/get')

const handlers = async (repositories) => {
    return {
        item: {
            createItem: createItem.bind(null, repositories),
            getItems: getItems.bind(null, repositories),
            updateItem: updateItem.bind(null, repositories),
            updateStockItem: updateStockItem.bind(null, repositories),
            deleteItem: deleteItem.bind(null, repositories)
        },
        transaction: {
            createTransaction: createTransaction.bind(null, repositories),
            getTransactions: getTransactions.bind(null, repositories)
        }
    }
}

module.exports = handlers