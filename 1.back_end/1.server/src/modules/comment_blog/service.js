const { hashSync, compareSync } = require('../../utils/bcrypt.js')
const useQuery= require('../../utils/query.js')
const User = require('../user/model.js')
const CommentBlog = require('./model.js')

//check existed

async function existedCommentBlog(req, res, next) {
  try {
    const { id } = req.params

    const response = await CommentBlog.findOne({
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
async function commentBlogPost(req, res) {
  try {
    const response = await CommentBlog.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get
async function commentBlogGet(req, res) {
  try {
    res.status(200).json({ data: res.locals.response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//gets
async function commentBlogGets(req, res) {
  try {
    const {offset=0,limit=12}=req.query
    let {where,order}= useQuery(req)
    const response = await CommentBlog.findAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      order: [...order],
      
      include: {
        model: User,
        as: 'UserCommentBlog',
        attributes:['id','username']
      },
    })

    res.status(200).json({ data: response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//update
async function commentBlogUpdate(req, res) {
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
async function commentBlogRemove(req, res) {
  try {
    res.locals.response.destroy()

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
module.exports = {
  existedCommentBlog,
  commentBlogPost,
  commentBlogGet,
  commentBlogGets,
  commentBlogUpdate,
  commentBlogRemove,
}
