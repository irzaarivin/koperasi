const express = require('express')
const itemRoutes = express.Router()

module.exports = async (transactionController) => {
    const { create, createBulk, get, update, ddelete } = await transactionController

    itemRoutes.post('/', async (req, res) => {
        res.send(await create(req));
    })

    itemRoutes.post('/bulk', async (req, res) => {
        res.send(await createBulk(req))
    })

    itemRoutes.get('/', async (req, res) => {
        res.send(await get(req));
    })

    return itemRoutes
};
