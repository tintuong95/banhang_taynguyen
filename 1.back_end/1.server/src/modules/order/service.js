const moment = require('moment/moment.js')
const { Op } = require('sequelize')
const useQuery = require('../../utils/query.js')
const CartItem = require('../cart_item/model.js')
const OrderItem = require('../order_item/model.js')
const Product = require('../product/model.js')
const User = require('../user/model.js')
const Order = require('./model.js')

//check existed

async function existedOrder(req, res, next) {
  try {
    const { id } = req.params

    const response = await Order.findOne({
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
async function orderPost(req, res) {
  try {
    const { orderItems, info } = req.body

    const subtotal = orderItems.reduce((a, b) => a + b.quantity * b.ProductCartItem.price, 0)
    const shipping = info.shipping // tien ship
    const total = subtotal + shipping
    const discount = 0 // tien ma giam gia
    const grandtotal = total - discount

    const response = await Order.create({
      ...info,
      subtotal,
      shipping,
      total,
      discount,
      grandtotal,
    })
    const idOrder = response.getDataValue('id')
    orderItems.forEach((item) => {
      OrderItem.create({ idProduct: item.idProduct, quantity: item.quantity, idOrder })
    })
    orderItems.forEach((item) => {
      CartItem.update({ status: 0 }, { where: { id: item.id } })
    })

    res.sendStatus(201)

  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
//meco
//get
async function orderGet(req, res) {
  try {
    res.status(200).json({ data: res.locals.response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//gets
async function orderGets(req, res) {
  try {
    const { offset = 0, limit = 12 } = req.query
    let { where, order } = useQuery(req, 'code')
    const response = await Order.findAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      order: [
        ...order
      ],
      include: [{
        model: OrderItem,
        as: 'OrderOrderItem',
        include: { model: Product, as: 'OrderItemProduct' },
      },
      { model: User, as: 'UserOrder' },
      ],
    })

    res.status(200).json({ data: response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get tổng thu nhập
async function orderTotalTurnOver(req, res) {
  try {
    const response = await Order.findAll({
      where: {
        status: 1,
      },
    })
    let initialValue = 0
    response.forEach((item) => {
      initialValue += item.grandtotal
    })

    res.status(200).json({ data: initialValue })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
//get tổng thu nhập tháng cuối
async function orderTotalTurnOverMonth(req, res) {
  try {
    const end = new Date()
    const response = await Order.findAll({
      where: {
        status: 1,
        updatedAt: {
          [Op.lt]: end,
          [Op.gt]: new Date(`${end.getFullYear()}-${end.getMonth()}-1`),
        },
      },
    })
    let initialValue = 0
    response.forEach((item) => {
      initialValue += item.grandtotal
    })

    res.status(200).json({ data: initialValue })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get tổng số đơn
async function orderTotalCounter(req, res) {
  try {
    const response = await Order.count({
      where: {
        status: 1,
      },
    })

    res.status(200).json({ data: response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get tổng so don tháng
async function orderTotalCounterMonth(req, res) {
  try {
    const end = new Date()
    const response = await Order.count({
      where: {
        status: 1,
        updatedAt: {
          [Op.lt]: end,
          [Op.gt]: new Date(`${end.getFullYear()}-${end.getMonth()}-1`),
        },
      },
    })

    res.status(200).json({ data: response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get tổng thu nhập 12 thang gần nhất
async function orderTurnOverData(req, res) {
  try {
    let data = []
    for (var i = 0; i < 11; i++) {
      const firstDate = moment().subtract((i+1),"months")
      const lastDate = moment().subtract( i, "months")

      const response = await Order.findAll({
        where: {
          status: 1,
          updatedAt: {
            [Op.lt]: lastDate,
            [Op.gt]: firstDate,
          },
        },
      })
     
      let initialValue = 0
      response.forEach((item) => {
        initialValue += item.grandtotal
      })
  
      data.push({
        type: `T ${lastDate.month() }`,
        sales: Math.round(initialValue / 10000) / 100,
      })
      
    }
    console.log("hihi", data)
    res.status(200).json({ data })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
//get tổng thu nhập 1 tuần  gần nhất
async function orderTurnOverWeekData(req, res) {
  try {
    let data = []

    for (var i = 0; i < 7; i++) {
      let date = new Date(new Date() - i * 24 * 60 * 60 * 1000)

      const response = await Order.findAll({
        where: {
          status: 1,
          updatedAt: {
            [Op.lt]: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 0),
            [Op.gt]: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
          },
        },
      })
      let initialValue = 0
      response.forEach((item) => {
        initialValue += item.grandtotal
      })
      data.push({
        type: `${date.getDay() == 6 ? 'CN' : `T ${date.getDay() + 2}`}`,
        sales: Math.round(initialValue / 10000) / 100,
      })
    }
    res.status(200).json({ data })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
//get tổng don 12 thang gần nhất
async function orderCounterData(req, res) {
  try {

    let data = []
    for (var i = 1; i < 12; i++) {
      const firstDate = moment().subtract((i + 1), "months")
      const lastDate = moment().subtract(i, "months")

      const response = await Order.count({
        where: {
          status: 1,
          updatedAt: {
            [Op.lt]: lastDate,
            [Op.gt]: firstDate,
          },
        },
      })
      data.push({
        type: `T ${lastDate.month()+1}`,
        sales: response,
      })
    }
    res.status(200).json({ data })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get tổng don tuan  gần nhất
async function orderCounterWeekData(req, res) {
  try {
    let data = []
    for (var i = 0; i < 7; i++) {
      let date = new Date(new Date() - i * 24 * 60 * 60 * 1000)

      const response = await Order.count({
        where: {
          status: 1,
          updatedAt: {
            [Op.lt]: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 0),
            [Op.gt]: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
          },
        },
      })
      data.push({
        type: `${date.getDay() == 6 ? 'CN' : `T ${date.getDay() + 2}`}`,
        sales: response,
      })
    }
    res.status(200).json({ data })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
//update
async function orderUpdate(req, res) {
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
async function orderRemove(req, res) {
  try {
    res.locals.response.destroy()

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//change status
async function orderChangeStatus(req, res) {
  try {
    res.locals.response.update({ status: res.locals.response.dataValues.status == 0 ? 1 : 0 })
    res.locals.response.save()
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

module.exports = {
  existedOrder,
  orderPost,
  orderGet,
  orderGets,
  orderUpdate,
  orderRemove,
  orderTotalTurnOver,
  orderTotalTurnOverMonth,
  orderTotalCounter,
  orderTotalCounterMonth,
  orderTurnOverWeekData,
  orderCounterWeekData,
  orderCounterData,
  orderTurnOverData,
  orderChangeStatus,
}