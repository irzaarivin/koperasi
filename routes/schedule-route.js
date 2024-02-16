const express = require('express')
const scheduleRoutes = express.Router()

module.exports = async (scheduleController) => {
    const { create, get } = await scheduleController

    scheduleRoutes.post('/', async (req, res) => {
        res.send(await create(req));
    })

    scheduleRoutes.get('/', async (req, res) => {
        res.send(await get(req));
    })

    return scheduleRoutes
};
