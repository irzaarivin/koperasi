const itemsController = async (handlers) => {

    const { getItems, createItem, updateItem, deleteItem } = await handlers

    const get = async (req) => {
        const params = req.query
        return await getItems(params)
    }

    const create = async (req) => {
        const data = req.body
        return await createItem(data)
    }

    const update = async (req) => {
        const id = req.query.id
        const data = req.body
        return await updateItem({id, data})
    }

    const ddelete = async (req) => {
        const id = req.query.id
        return await deleteItem(id)
    }

    return { create, get, update, ddelete }

}

module.exports = itemsController