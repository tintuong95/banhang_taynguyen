const express = require('express')
const { uploadBlog } = require('../../configs/upload.js')
const { roleRouter, Role } = require('../../middlewares/role.js')

const serviceBlog = require('./service')

const routeBlog = express.Router()

routeBlog.get('/', roleRouter([Role.Anonymous, Role.User, Role.Admin]), serviceBlog.blogGets)

routeBlog.get(
  '/status/:id',
   roleRouter([Role.Anonymous, Role.User, Role.Admin]),
  serviceBlog.existedBlog,
  serviceBlog.blogChangeStatus
)

routeBlog.get('/:id', serviceBlog.existedBlog, serviceBlog.blogGet)

routeBlog.get('/:id/view', serviceBlog.existedBlog, serviceBlog.blogView) ///asdfd

routeBlog.get(
  '/param/:param',
 
  serviceBlog.blogGetParam
)

routeBlog.post('/', roleRouter([Role.Admin]), uploadBlog.single('image'), serviceBlog.blogPost)

routeBlog.post(
  '/upload-image',

  uploadBlog.single('upload'),
  serviceBlog.blogUploadImage
)

routeBlog.put(
  '/:id',
  roleRouter([Role.Admin]),
  serviceBlog.existedBlog,
  uploadBlog.single('image'),
  serviceBlog.blogUpdate
)

routeBlog.delete('/:id', roleRouter([Role.Admin]), serviceBlog.existedBlog, serviceBlog.blogRemove)

module.exports = routeBlog
