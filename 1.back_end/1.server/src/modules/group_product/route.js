const express = require('express');

const serviceGroupProduct = require("./service")

const routeGroupProduct = express.Router()

routeGroupProduct.get('/', serviceGroupProduct.groupProductGets)

routeGroupProduct.get('/:id', serviceGroupProduct.existedGroupProduct, serviceGroupProduct.groupProductGet)

routeGroupProduct.post('/', serviceGroupProduct.groupProductPost)

routeGroupProduct.put('/:id', serviceGroupProduct.existedGroupProduct, serviceGroupProduct.groupProductUpdate)

routeGroupProduct.delete('/:id', serviceGroupProduct.existedGroupProduct, serviceGroupProduct.groupProductRemove)

module.exports = routeGroupProduct