const itemsController = require('./controllers/itemsController')
const transactionController = require('./controllers/transactionController')
const scheduleController = require('./controllers/scheduleController')

const controllers = async (handlers) => {
    return {
        itemsController: await itemsController(await handlers.item),
        transactionController: await transactionController(await handlers.transaction),
        scheduleController: await scheduleController(await handlers.schedule)
    }
}

module.exports = controllers