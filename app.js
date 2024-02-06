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

    app.use(session({ secret: 'gacor-kang-mantap-djiwa', resave: true, saveUninitialized: true }))
    app.use(cors({
        origin: 'http://localhost:3000'
    }))

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    // ======================================================================== //
    // ======================================================================== //


    // DATABASE CONFIG
    const { database, testConnection } = require('./database')

    // REPOSITORIES
    const repos = require('./repositories.js')
    const repositories = repos(database)

    // HANDLERS
    const handlers = require('./handlers')(repositories)

    // CONTROLLERS
    const controllers = require('./controllers.js')(await handlers)


    // ======================================================================== //
    // ======================================================================== //


    // RUNNING SERVER
    const routes = require('./routes');
    await routes(app, controllers);

    server.listen(port, () => {
        console.log('Server is running on port', port)
    })

})()