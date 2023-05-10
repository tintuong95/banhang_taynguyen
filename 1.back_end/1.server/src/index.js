//import library
const express = require('express')
const cors = require('cors')

//import source
const plugins = require('./configs/plugins.js')
const startServer = require('./configs/server.js')
const sequelize = require('./configs/sequelize')
const routeRoot = require('./configs/routers.js')
const os = require('os')
// foreignKey fix error
require("./configs/associations.js")

const server = express()

plugins(server)

server.use('/api', routeRoot)

//db connect sync

sequelize.sync({ alter: false })

startServer(server)

//tintuong1

