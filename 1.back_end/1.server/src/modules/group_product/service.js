const { hashSync, compareSync } = require('../../utils/bcrypt.js')
const useQuery= require('../../utils/query.js')
const GroupProduct = require('./model.js')

//check existed

async function existedGroupProduct(req, res, next) {
  try {
    const { id } = req.params

    const response = await GroupProduct.findOne({
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
async function groupProductPost(req, res) {
  try {
    const response = await GroupProduct.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get
async function groupProductGet(req, res) {
  try {
    res.status(200).json({ data: res.locals.response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//gets
async function groupProductGets(req, res) {
  try {
    const { offset = 0, limit = 12 } = req.query
    let {where,order}= useQuery(req)
    const response = await GroupProduct.findAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      order: [...order],
    })

    res.status(200).json({ data: response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//update
async function groupProductUpdate(req, res) {
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
async function groupProductRemove(req, res) {
  try {
    res.locals.response.destroy()

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
module.exports = {
  existedGroupProduct,
  groupProductPost,
  groupProductGet,
  groupProductGets,
  groupProductUpdate,
  groupProductRemove,
}
