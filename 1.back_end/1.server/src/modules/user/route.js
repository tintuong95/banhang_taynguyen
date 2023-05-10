const express = require('express');
const { roleRouter, Role } = require('../../middlewares/role.js');

const serviceUser = require("./service")

const routeUser = express.Router()

routeUser.get('/', serviceUser.userGets)

routeUser.get('/cookies', serviceUser.userCookies)

routeUser.get('/logout', serviceUser.userLogout)

routeUser.get('/status/:id', serviceUser.existedUser, serviceUser.userChangeStatus)

routeUser.get('/:id', serviceUser.existedUser, serviceUser.userGet)

routeUser.post('/login', serviceUser.existedUser, serviceUser.userLogin)

routeUser.post('/login-with-third-party', serviceUser.userLoginThirdParty)

routeUser.post('/signup', serviceUser.userSignup)

routeUser.put('/:id', serviceUser.existedUser, serviceUser.userUpdate)

routeUser.delete('/:id', roleRouter([Role.Admin]), serviceUser.existedUser, serviceUser.userRemove)





module.exports = routeUser