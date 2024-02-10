const itemsController = async (itemHandler) => {

    const { getItems, createItem, updateItem, updateStockItem, deleteItem } = await itemHandler

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

    const updateStock = async (req) => {
        const id = req.query.id
        const stock = req.query.add_stock
        return await updateStockItem({id, stock})
    }

    const ddelete = async (req) => {
        const id = req.query.id
        return await deleteItem(id)
    }

    return { create, get, update, updateStock, ddelete }

}

module.exports = itemsController