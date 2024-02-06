const itemsController = require('./controllers/itemsController')

const controllers = async (handlers) => {
    return {
        itemsController: await itemsController(await handlers),
    }
}

module.exports = controllers