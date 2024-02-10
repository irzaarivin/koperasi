const express = require('express')
const itemRoutes = express.Router()

module.exports = async (itemsController) => {
    const { create, get, update, ddelete } = await itemsController

    itemRoutes.post('/', async (req, res) => {
        res.send(await create(req));
    })

    itemRoutes.get('/', async (req, res) => {
        res.send(await get(req));
    })

    itemRoutes.put('/', async (req, res) => {
        res.send(await update(req))
    })

    itemRoutes.delete('/', async (req, res) => {
        res.send(await ddelete(req))
    })

    return itemRoutes
};
