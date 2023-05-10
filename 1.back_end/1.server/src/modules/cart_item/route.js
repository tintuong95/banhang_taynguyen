const express = require('express');
const { roleRouter, Role } = require('../../middlewares/role.js');

const serviceCartItem = require("./service")

const routeCartItem = express.Router()

routeCartItem.get('/', roleRouter([Role.User, Role.Admin]), serviceCartItem.cartItemGets)

routeCartItem.get(
  '/:id',
  roleRouter([Role.User, Role.Admin]),
  serviceCartItem.existedCartItem,
  serviceCartItem.cartItemGet
)

routeCartItem.post('/', roleRouter([Role.User, Role.Admin]), serviceCartItem.cartItemPost)

routeCartItem.put(
  '/:id',
  roleRouter([Role.User, Role.Admin]),
  serviceCartItem.existedCartItem,
  serviceCartItem.cartItemUpdate
)

routeCartItem.delete('/:id',roleRouter([Role.User,Role.Admin])
, serviceCartItem.existedCartItem, serviceCartItem.cartItemRemove)

module.exports = routeCartItem