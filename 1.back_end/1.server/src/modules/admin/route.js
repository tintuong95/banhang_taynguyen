const express = require('express');

const serviceAdmin = require("./service")

const routeAdmin = express.Router()

routeAdmin.post('/login', serviceAdmin.existedAdmin, serviceAdmin.adminLogin)

routeAdmin.post('/signup', serviceAdmin.adminSignup)

routeAdmin.get('/logout', serviceAdmin.adminLogout)

routeAdmin.get('/profile', serviceAdmin.adminCookies)

module.exports = routeAdmin