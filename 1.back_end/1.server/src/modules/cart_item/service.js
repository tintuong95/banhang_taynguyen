const { hashSync, compareSync } = require('../../utils/bcrypt.js')
const useQuery = require('../../utils/query.js')
const Product = require('../product/model.js')
const CartItem = require('./model.js')

//check existed

async function existedCartItem(req, res, next) {
    try {
        const { id } = req.params

        const response = await CartItem.findOne({
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
async function cartItemPost(req, res) {
    try {
        const response = await CartItem.create(req.body)
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//get
async function cartItemGet(req, res) {
    try {
        res.status(200).json({ data: res.locals.response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//gets
async function cartItemGets(req, res) {
    try {

        const { offset = 0, limit = 12 } = req.query
        let { where, order } = useQuery(req, null, res.locals.role)

        const response = await CartItem.findAll({
            where,
            offset: Number(offset),
            limit: Number(limit),
            order: [...order],
            include: { model: Product, as: 'ProductCartItem' },
        })

        res.status(200).json({ data: response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//update
async function cartItemUpdate(req, res) {
    try {
        res.locals.response.update(req.body)
        res.locals.response.save()
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//remove
async function cartItemRemove(req, res) {
    try {
        res.locals.response.destroy()

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
module.exports = {
    existedCartItem,
    cartItemPost,
    cartItemGet,
    cartItemGets,
    cartItemUpdate,
    cartItemRemove,
}