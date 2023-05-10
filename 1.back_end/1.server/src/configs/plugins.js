const cors = require('cors')
const helmet = require('helmet')
const multer = require('multer')
const morgan = require('morgan')
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')


// setup header cors backend
var allowCrossDomain = function(req, res, next) {

     res.header('Access-Control-Allow-Origin', req.headers.origin)
     res.header('Access-Control-Allow-Credentials', 'true')
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
     res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept,Set-Cookie'
     )
       res.header('Vary', 'Origin ')
     res.header('Cross-Origin-Resource-Policy', 'cross-origin')
     next()
    
};

function plugins(server) {
    //Biến môi trường
    dotenv.config()

    server.use(allowCrossDomain)
    server.use(express.static(path.join(__dirname, '../../public')))
    server.use(helmet({ contentSecurityPolicy: false }))
    server.use(express.urlencoded({ extended: true, limit: '2000mb' }))
    server.use(express.json())
    server.use(allowCrossDomain, express.static(path.join(__dirname, '../public')))
    server.use(morgan('combined'))
    server.use(cookieParser())

}

module.exports = plugins