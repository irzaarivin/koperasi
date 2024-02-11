const express = require('express')
const itemRoutes = express.Router()

module.exports = async (itemsController) => {
    const { create, get, getById, update, updateStock, ddelete } = await itemsController

    itemRoutes.post('/', async (req, res) => {
        res.send(await create(req));
    })

    itemRoutes.get('/', async (req, res) => {
        res.send(await get(req));
    })

    itemRoutes.get('/find', async (req, res) => {
        res.send(await getById(req));
    })

    itemRoutes.put('/', async (req, res) => {
        res.send(await update(req))
    })

    itemRoutes.put('/stock', async (req, res) => {
        res.send(await updateStock(req))
    })

    itemRoutes.delete('/', async (req, res) => {
        res.send(await ddelete(req))
    })

    return itemRoutes
};
