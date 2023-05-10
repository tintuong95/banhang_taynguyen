const express = require('express');

const serviceOrderItem = require("./service")

const routeOrderItem = express.Router()

routeOrderItem.get('/', serviceOrderItem.orderItemGets)

routeOrderItem.get('/:id', serviceOrderItem.existedOrderItem, serviceOrderItem.orderItemGet)

routeOrderItem.post('/', serviceOrderItem.orderItemPost)

routeOrderItem.put('/:id', serviceOrderItem.existedOrderItem, serviceOrderItem.orderItemUpdate)

routeOrderItem.delete('/:id', serviceOrderItem.existedOrderItem, serviceOrderItem.orderItemRemove)

module.exports = routeOrderItem