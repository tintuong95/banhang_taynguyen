const { Sequelize } = require('sequelize')
require('dotenv').config()

const {
  DB_NAME ,
  DB_HOST ,
  DB_USERNAME ,
  DB_PASSWORD ,
} = process.env


const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
})

module.exports = sequelize
