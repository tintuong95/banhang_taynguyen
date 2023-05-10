const { hashSync, compareSync } = require('../../utils/bcrypt.js')
const useQuery= require('../../utils/query.js')
const User = require('../user/model.js')
const CommentProduct = require('./model.js')

//check existed

async function existedCommentProduct(req, res, next) {
  try {
    const { id } = req.params

    const response = await CommentProduct.findOne({
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
async function commentProductPost(req, res) {
  try {
    const response = await CommentProduct.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get
async function commentProductGet(req, res) {
  try {
    res.status(200).json({ data: res.locals.response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//gets
async function commentProductGets(req, res) {
  try {
        const { offset = 0, limit = 12 } = req.query
    let {where,order}= useQuery(req)
    const response = await CommentProduct.findAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      order: [...order],
      include: {
        model: User,
        as: 'UserCommentProduct',

        attributes: ['id', 'username'],
      },
    })

    res.status(200).json({ data: response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//update
async function commentProductUpdate(req, res) {
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
async function commentProductRemove(req, res) {
  try {
    res.locals.response.destroy()

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
module.exports = {
  existedCommentProduct,
  commentProductPost,
  commentProductGet,
  commentProductGets,
  commentProductUpdate,
  commentProductRemove,
}
