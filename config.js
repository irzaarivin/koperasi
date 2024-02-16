require('dotenv').config({ path: './.env' })

module.exports = {
    "development": {
        // "mongo": {
        //     "url": process.env.MONGO_URL,
        //     "database": process.env.MONGO_DATABASE,
        // },
        "username": process.env.SQL_USERNAME,
        "password": process.env.SQL_PASSWORD,
        "database": process.env.SQL_DATABASE,
        "host": process.env.SQL_HOST,
        "port": process.env.SQL_PORT,
        "dialect": "mysql",
        "logging": false
    },
    "test": {
        "mongo_url": process.env.MONGO_URL,
        "mongo_database": process.env.MONGO_DATABASE,
        "sql_username": process.env.SQL_USERNAME,
        "sql_password": process.env.SQL_PASSWORD,
        "sql_database": process.env.SQL_DATABASE,
        "sql_host": process.env.SQL_HOST,
        "sql_dialect": "mysql",
        "logging": false
    },
    "production": {
        "mongo_url": process.env.MONGO_URL,
        "mongo_database": process.env.MONGO_DATABASE,
        "sql_username": process.env.SQL_USERNAME,
        "sql_password": process.env.SQL_PASSWORD,
        "sql_database": process.env.SQL_DATABASE,
        "sql_host": process.env.SQL_HOST,
        "sql_dialect": "mysql",
        "logging": false
    }
}
  