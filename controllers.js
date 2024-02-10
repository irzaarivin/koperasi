const itemsController = require('./controllers/itemsController')
const transactionController = require('./controllers/transactionController')

const controllers = async (handlers) => {
    return {
        itemsController: await itemsController(await handlers.item),
        transactionController: await transactionController(await handlers.transaction)
    }
}

module.exports = controllers