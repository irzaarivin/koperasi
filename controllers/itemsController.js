const itemsController = async (handlers) => {

    const { getAllItems } = await handlers

    const getAll = async (data) => {
        console.log({handlers, data})
        return await getAllItems(data)
    }

    const getById = async (data) => {
        console.log({handlers, data})
        return data
    }

    return { getAll, getById }

}

module.exports = itemsController