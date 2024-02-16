const { development } = require('./config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: development.dialect,
  host: development.host,
  port: development.port,
  username: development.username,
  password: development.password,
  database: development.database
});

module.exports = { Sequelize, sequelize }