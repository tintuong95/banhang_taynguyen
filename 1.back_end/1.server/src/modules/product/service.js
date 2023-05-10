const { hashSync, compareSync } = require('../../utils/bcrypt.js')

const titleToParam = require('../../utils/param.js')
const Product = require('./model.js')
const useQuery = require('../../utils/query.js')
const Image = require('../image/model.js')
const CommentProduct = require('../comment_product/model.js')
const User = require('../user/model.js')
const Ratings = require('../ratings/model.js')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs-extra')
const { Role } = require('../../middlewares/role.js')

//check existed

async function existedProduct(req, res, next) {
    try {
        const { id } = req.params
        const response = await Product.findOne({
            where: { id },
        })
        if (response) {
            res.locals.response = await response
            next()
            return
        }
        return res.sendStatus(404)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//post
async function productPost(req, res) {
    try {
        const { title } = req.body

        const param = titleToParam(title)

        //resize image
        sharp(req.files.image[0].path)
            .resize(220, 220)
            .toFile(
                path.resolve(req.files.image[0].destination, '220x220_' + req.files.image[0].filename),
                function(err) {
                    if (!err) {
                        fs.removeSync(req.files.image[0].path)
                    }
                }
            )
        const response = await Product.create({
            ...req.body,
            param,
            image: req.protocol +
                '://' +
                req.headers.host +
                '/api/img/product/220x220_' +
                req.files.image[0].filename,
        })

        const idProduct = await response.getDataValue('id')

        await req.files.images.forEach(async(item) => {
            sharp(item.path)
                .resize(540, 450)
                .toFile(
                    path.resolve(req.files.image[0].destination, '540x450_' + item.filename),
                    function(err) {
                        if (!err) {
                            Image.create({
                                idProduct,
                                image: req.protocol +
                                    '://' +
                                    req.headers.host +
                                    '/api/img/product/540x450_' +
                                    item.filename,
                            })
                            fs.removeSync(item.path)
                        }
                    }
                )
        })

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//get
async function productGet(req, res) {
    try {
        res.status(200).json({ data: res.locals.response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//get
async function productGetParam(req, res) {
    try {
        const { param } = req.params
        let query = {
            param,
        }
        if (res.locals.role == Role.User || res.locals.role == Role.Anonymous) {
            query.status = 1
        }

        const response = await Product.findOne({
            where: query,
            include: [{
                    model: CommentProduct,
                    as: 'ProductComment',
                    include: { model: User, as: 'UserCommentProduct' },
                },
                {
                    model: Ratings,
                    as: 'ProductRatings',
                    include: { model: User, as: 'UserRatings' },
                },
                {
                    model: Image,
                    as: 'ProductImage',
                },
            ],
        })
        if (response) {
            return res.status(200).json({ data: response })
        }
        return res.sendStatus(404)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//gets
async function productGets(req, res) {
    try {

        const { offset = 0, limit = 12 } = req.query
        let { where, order } = useQuery(req, 'title', res.locals.role)

        const response = await Product.findAll({
            where: {
                ...where,
                status:1
            },
            offset: Number(offset),
            limit: Number(limit),
            distinct: true,
            order: [

                ...order
            ],
            attributes: [
                'id',
                'idGroupProduct',
                'unit',
                'title',
                'param',
                'price',
                'image',
                'status',
                'sale',
                'height',
                'length',
                'weight',
                'width',
                'amount',
                'updatedAt',
                'createdAt',
            ],
            include: [{
                    model: CommentProduct,
                    as: 'ProductComment',
                    attributes: ['id'],
                    // include: { model: User, as: 'UserCommentProduct' },
                },

                {
                    model: Ratings,
                    as: 'ProductRatings',
                    attributes: ['id'],
                    // include: { model: User, as: 'UserRatings' },
                },
            ],
        })
        res.status(200).json({ data: response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//update
async function productUpdate(req, res) {
    try {
        const data = {}
        const idProduct = await res.locals.response.getDataValue('id')
            //check update  image
        if (req.files.image) {
            //resize image
            sharp(req.files.image[0].path)
                .resize(220, 220)
                .toFile(
                    path.resolve(req.files.image[0].destination, '220x220_' + req.files.image[0].filename),
                    function(err) {
                        if (!err) {
                            Image.create({
                    
                                idProduct,
                                image: req.protocol +
                                    '://' +
                                    req.headers.host +
                                    '/api/img/product/220x220_' +
                                    req.files.image[0].filename,
                            })

                            fs.removeSync(req.files.image[0].path)
                        }
                    }
                )
            data.image =
                req.protocol + '://' + req.headers.host + '/api/img/product/220x220_' + req.files.image[0].filename
        }

        
            //check update list images
        if (req.files.images) {
            await req.files.images.forEach(async(item) => {
                sharp(item.path)
                    .resize(540, 450)
                    .toFile(path.resolve(item.destination, '540x450_' + item.filename), function(err) {
                        if (!err) {
                            Image.create({
                                idProduct,
                                image: req.protocol +
                                    '://' +
                                    req.headers.host +
                                    '/api/img/product/540x450_' +
                                    item.filename,
                            })
                            fs.removeSync(item.path)
                        }
                    })
            })
        }

        res.locals.response.update({
            ...req.body,
            param: titleToParam(req.body.title),
            ...data,
        })
        res.locals.response.save()
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//remove
async function productRemove(req, res) {
    try {
        res.locals.response.destroy()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//upload image
async function productUploadImage(req, res) {
    try {
        //resize image
        // sharp(req.file.path)
        //   .resize(540, 450)
        //   .toFile(path.resolve(req.file.destination, '540x450_' + req.file.filename), function (err) {
        //     if (!err) {
        //       fs.removeSync(req.file.path)
        //     }
        //   })
        // res.json({
        //   uploaded: true,
        //   url:
        //     req.protocol + '://' + req.headers.host + '/api/img/product/540x450_' + req?.file.filename,
        // })
        res.json({
            uploaded: true,
            url: req.protocol + '://' + req.headers.host + '/api/img/product/' + req.file.filename,
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//change status
async function productChangeStatus(req, res) {
    try {
        res.locals.response.update({ status: res.locals.response.dataValues.status == 0 ? 1 : 0 })
        res.locals.response.save()
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//get counter group products
async function productCountGroup(req, res) {
    try {
        const response = await Product.count({
            where: {
                status: 1,
                idGroupProduct: req.params.idGroupProduct,
            },
        })
        res.status(200).json({ data: response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//change status
async function productView(req, res) {
    try {
        res.locals.response.update({ view: ++res.locals.response.toJSON()['view'] })
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
//gets
async function productListIdGets(req, res) {
    try {
        const { list } = req.body
        const response = await Product.findAll({
            where: { id: list },
            attributes: ['id', 'amount'],
        })
        res.status(200).json({ data: response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {
    existedProduct,
    productPost,
    productGet,
    productGets,
    productUpdate,
    productView,
    productRemove,
    productUploadImage,
    productCountGroup,
    productGetParam,
    productChangeStatus,
    productListIdGets,
}