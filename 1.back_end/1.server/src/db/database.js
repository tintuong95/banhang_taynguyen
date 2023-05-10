
require("dotenv").config()

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env
console.log(DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD)
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
  },
  test: {
    
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
}
