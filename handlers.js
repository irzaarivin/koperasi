const createItem = require('./handlers/create-item')
const getItems = require('./handlers/get-items')
const updateItem = require('./handlers/update-item')
const deleteItem = require('./handlers/delete-item')

const handlers = async (repositories) => {
    return {
        createItem: createItem.bind(null, repositories),
        getItems: getItems.bind(null, repositories),
        updateItem: updateItem.bind(null, repositories),
        deleteItem: deleteItem.bind(null, repositories)
    }
}

module.exports = handlers