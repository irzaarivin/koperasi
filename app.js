(async () => {

    // DECLARE EXPRESSJS
    const express = require('express')
    const session = require('express-session')
    const app = express()
    const bodyParser = require('body-parser');
    const http = require('http')
    const server = http.createServer(app)
    const cors = require('cors')
    const port = 4444


    // ======================================================================== //
    // ======================================================================== //

    // SERVER CONFIG
    app.use(session({ secret: 'gacor-kang-mantap-djiwa', resave: true, saveUninitialized: true }))
    app.use(cors({
        origin: 'http://localhost:3000'
    }))

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    // ======================================================================== //
    // ======================================================================== //


    // DATABASE CONFIG
    const { testConnection, Sequelize, sequelize } = require('./database')

    // MODELS
    const model = require('./models')
    const models = await model(Sequelize, sequelize)

    // REPOSITORIES
    const repository = require('./repositories')
    const repositories = await repository(models)

    // HANDLERS
    const handler = require('./handlers')
    const handlers = await handler(repositories)

    // CONTROLLERS
    const controller = require('./controllers')
    const controllers = await controller(handlers)


    // ======================================================================== //
    // ======================================================================== //


    // RUNNING SERVER
    const routes = require('./routes');
    await routes(app, controllers);

    server.listen(port, () => {
        console.log('Server is running on port', port)
    })

})()