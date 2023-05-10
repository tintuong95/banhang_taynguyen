const express = require('express')
const multer = require('multer')
const { uploadProduct } = require('../../configs/upload.js')
const { roleRouter, Role } = require('../../middlewares/role.js')

const serviceProduct = require('./service')

const routeProduct = express.Router()

routeProduct.get(
    '/',
    roleRouter([Role.Anonymous, Role.User, Role.Admin]), // thu tu quyen tu thap den cao
    serviceProduct.productGets
)

routeProduct.post('/list', serviceProduct.productListIdGets)

routeProduct.get(
    '/count/:idGroupProduct',
    roleRouter([Role.Anonymous, Role.User, Role.Admin]),
    serviceProduct.productCountGroup
)

routeProduct.get(
    '/status/:id',
    roleRouter([Role.Admin]),
    serviceProduct.existedProduct,
    serviceProduct.productChangeStatus
)

routeProduct.get('/:id/view', serviceProduct.existedProduct, serviceProduct.productView)



routeProduct.get(
    '/:id',

    serviceProduct.existedProduct,
    serviceProduct.productGet
)

routeProduct.get(
    '/param/:param',
    roleRouter([Role.Anonymous, Role.User, Role.Admin]),
    serviceProduct.productGetParam
)

routeProduct.post(
    '/',
    roleRouter([Role.Admin]),
    uploadProduct.fields([
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 5 },
    ]),
    serviceProduct.productPost
)

routeProduct.put(
    '/:id',
    roleRouter([Role.Admin]),
    serviceProduct.existedProduct,
    uploadProduct.fields([
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 5 },
    ]),
    serviceProduct.productUpdate
)

routeProduct.delete(
    '/:id',
    roleRouter([Role.Admin]),
    serviceProduct.existedProduct,
    serviceProduct.productRemove
)

routeProduct.post(
    '/upload-image',

    uploadProduct.single('upload'),
    serviceProduct.productUploadImage
)

routeProduct.get(
    '/view',
    serviceProduct.productUploadImage
)




module.exports = routeProduct