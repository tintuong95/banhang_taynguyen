const { hashSync, compareSync } = require('../../utils/bcrypt.js')
const useQuery = require('../../utils/query.js')
const Product = require('../product/model.js')
const OrderItem = require('./model.js')

//check existed

async function existedOrderItem(req, res, next) {
    try {
        const { id } = req.params

        const response = await OrderItem.findOne({
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
async function orderItemPost(req, res) {
    try {
        const response = await OrderItem.create(req.body)
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//get
async function orderItemGet(req, res) {
    try {
        res.status(200).json({ data: res.locals.response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//gets
async function orderItemGets(req, res) {
    try {
        const { offset = 0, limit = 12 } = req.query
        let { where, order } = useQuery(req)
        const response = await OrderItem.findAll({
            where,
            offset: Number(offset),
            limit: Number(limit),
            order: [...order],
            include: [{ model: Product, as: 'OrderItemProduct' }],
        })

        res.status(200).json({ data: response })
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//update
async function orderItemUpdate(req, res) {
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
async function orderItemRemove(req, res) {
    try {
        res.locals.response.destroy()

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
module.exports = {
    existedOrderItem,
    orderItemPost,
    orderItemGet,
    orderItemGets,
    orderItemUpdate,
    orderItemRemove,
}