const getAllItems = require('./handlers/get-all-items')

const handlers = async (repositories) => {
    return {
        getAllItems: getAllItems.bind(null, repositories),
    }
}

module.exports = handlers