const express = require('express')
const itemRoutes = express.Router()

module.exports = async (transactionController) => {
    const { create, get, update, ddelete } = await transactionController

    itemRoutes.post('/', async (req, res) => {
        res.send(await create(req));
    })

    itemRoutes.get('/', async (req, res) => {
        res.send(await get(req));
    })

    return itemRoutes
};
