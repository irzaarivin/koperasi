const { development } = require('./config')
const { Sequelize } = require('sequelize')
const mongoose = require('mongoose')

// mongoose.connect(`${development.mongo.url}${development.mongo.database}`)
mongoose.connect('mongodb://localhost:27017/koperasi')

const sequelize = new Sequelize({
  dialect: development.dialect,
  host: development.host,
  port: development.port,
  username: development.username,
  password: development.password,
  database: development.database
});

module.exports = { Sequelize, sequelize, mongoose, mongooseConnection: mongoose.connection }