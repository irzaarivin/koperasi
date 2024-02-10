const itemRepositories = require('./repositories/itemRepositories')

const repositories = async (models) => {
    const { Item } = models

    return {
        itemRepositories: await itemRepositories(Item)
    }
}

module.exports = repositories