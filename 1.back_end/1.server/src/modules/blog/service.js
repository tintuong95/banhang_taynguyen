const path = require('path')
const sharp = require('sharp')
const fs = require('fs-extra')
const titleToParam = require('../../utils/param.js')
const useQuery= require('../../utils/query.js')
const CommentBlog = require('../comment_blog/model.js')
const GroupBlog = require('../group_blog/model.js')
const User = require('../user/model.js')
const Blog = require('./model.js')
const { Role } = require('../../middlewares/role.js')

//check existed

async function existedBlog(req, res, next) {
  try {
    const { id } = req.params

    const response = await Blog.findOne({
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
async function blogPost(req, res) {
  try {
    const { title } = req.body
    const param = titleToParam(title)

    //resize image
    sharp(req.file.path)
      .resize(220, 220)
      .toFile(path.resolve(req.file.destination, '220x220_' + req.file.filename), function (err) {
        if (!err) {
          Blog.create({
            ...req.body,
            param,
            image:
              req.protocol +
              '://' +
              req.headers.host +
              '/api/img/blog/220x220_' +
              req.file.filename,
          })

          fs.removeSync(req.file.path)
        }
      })

    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get
async function blogGet(req, res) {
  try {
    res.status(200).json({ data: res.locals.response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get
async function blogGetParam(req, res) {
  try {
    const { param } = req.params
    let query = { param }
    if (res.locals.role == Role.User || res.locals.role == Role.Anonymous) {
      query.status = 1
    }
    const response = await Blog.findOne({
      where:query,
      include: [
        {
          model: CommentBlog,
          as: 'BlogComment',
          include: { model: User, as: 'UserCommentBlog' },
        },
        {
          model: GroupBlog,
          as: 'GroupBlogBlog',
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
async function blogGets(req, res) {
  try {
    const { offset = 0, limit = 12 } = req.query
    let {where,order} = useQuery(req, 'title', res.locals.role)
    const response = await Blog.findAll({
      where:{
        status: 1, ...where
      },
      offset: Number(offset),
      limit: Number(limit),
      order: [...order],
      attributes: [
        'id',
        'idGroupBlog',
        'title',
        'image',
        'param',
        'view',
        'description',
        'createdAt',
        'updatedAt',
        'status',
      ],
      include: [
        {
          model: CommentBlog,
          as: 'BlogComment',
          attributes: ['id'],
          // include: { model: User, as: 'UserCommentBlog' },
        },
        {
          model: GroupBlog,
          as: 'GroupBlogBlog',
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
async function blogUpdate(req, res) {
  try {
    const data = {}
    if (req?.file?.filename) {
      //resize image
      sharp(req.file.path)
        .resize(220, 220)
        .toFile(path.resolve(req.file.destination, '220x220_' + req.file.filename), function (err) {
          if (!err) {
            // Blog.create({
            //   ...req.body,
              
            //   image:
            //     req.protocol +
            //     '://' +
            //     req.headers.host +
            //     '/api/img/blog/220x220_' +
            //     req.file.filename,
            // })

            fs.removeSync(req.file.path)
          }
        })

      data.image =
        req.protocol + '://' + req.headers.host + '/api/img/blog/220x220_' + req.file.filename
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

//change status
async function blogChangeStatus(req, res) {
  try {
    res.locals.response.update({ status: res.locals.response.dataValues.status == 0 ? 1 : 0 })

    res.locals.response.save()

    console.log(res.locals.response)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//remove
async function blogRemove(req, res) {
  try {
    res.locals.response.destroy()

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//upload image
async function blogUploadImage(req, res) {
  try {
    // sharp(req.file.path)
    //   .resize(615, 550)
    //   .toFile(path.resolve(req.file.destination, '615x550_' + req.file.filename), function (err) {
    //     if (!err) {
    //       fs.removeSync(req.file.path)
    //     }
    //   })
    // res.json({
    //   uploaded: true,
    //   url: req.protocol + '://' + req.headers.host + '/api/img/blog/615x550_' + req?.file.filename,
    // })
    res.json({
      uploaded: true,
      url: req.protocol + '://' + req.headers.host + '/api/img/blog/' + req?.file.filename,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//change status
async function blogView(req, res) {
  try {
    res.locals.response.update({ view: ++res.locals.response.toJSON()['view'] })

    console.log(res.locals.response.toJSON()['view'])
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

module.exports = {
  existedBlog,
  blogPost,
  blogGet,
  blogView,
  blogGets,
  blogUpdate,
  blogRemove,
  blogGetParam,
  blogChangeStatus,
  blogUploadImage,
}
