const express = require('express');
const { uploadProduct } = require('../../configs/upload.js');

const serviceImage = require("./service")

const routeImage = express.Router()

routeImage.get('/', serviceImage.imageGets)

routeImage.get('/:id', serviceImage.existedImage, serviceImage.imageGet)

routeImage.post('/',uploadProduct.array("images"), serviceImage.imagePost)

// routeImage.put('/:id', serviceImage.existedImage, serviceImage.ImageUpdate)

// routeImage.delete('/:id', serviceImage.existedImage, serviceImage.ImageRemove)

module.exports = routeImage