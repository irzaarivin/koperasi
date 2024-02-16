// ITEMS HANDLERS
const createItem = require('./handlers/item/create')
const getItems = require('./handlers/item/get')
const getItemById = require('./handlers/item/get-by-id')
const updateItem = require('./handlers/item/update')
const updateStockItem = require('./handlers/item/update-stock')
const deleteItem = require('./handlers/item/delete')

// TRANSACTION HANDLERS
const createTransaction = require('./handlers/transaction/create')
const createBulkTransaction = require('./handlers/transaction/create-bulk')
const getTransactions = require('./handlers/transaction/get')

// SCHEDULE HANDLERS
const getSchedules = require('./handlers/schedule/get')
const createSchedule = require('./handlers/schedule/create')

// BIND ALL HANDLER BY USE CASE
const handlers = async (repositories) => {
    return {
        item: {
            createItem: await createItem.bind(null, repositories),
            getItems: await getItems.bind(null, repositories),
            getItemById: await getItemById.bind(null, repositories),
            updateItem: await updateItem.bind(null, repositories),
            updateStockItem: await updateStockItem.bind(null, repositories),
            deleteItem: await deleteItem.bind(null, repositories)
        },
        transaction: {
            createTransaction: await createTransaction.bind(null, repositories),
            createBulkTransaction: await createBulkTransaction.bind(null, repositories),
            getTransactions: await getTransactions.bind(null, repositories)
        },
        schedule: {
            getSchedules: await getSchedules.bind(null, repositories),
            createSchedule: await createSchedule.bind(null, repositories)
        }
    }
}

module.exports = handlers