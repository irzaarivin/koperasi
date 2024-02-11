const express = require('express')
const transactionRoutes = express.Router()

module.exports = async (transactionController) => {
    const { create, createBulk, get, update, ddelete } = await transactionController

    transactionRoutes.post('/', async (req, res) => {
        res.send(await create(req));
    })

    transactionRoutes.post('/bulk', async (req, res) => {
        res.send(await createBulk(req));
    })

    transactionRoutes.get('/', async (req, res) => {
        res.send(await get(req));
    })

    return transactionRoutes
};
