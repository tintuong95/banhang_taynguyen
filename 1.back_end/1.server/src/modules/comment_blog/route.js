const express = require('express')
const { roleRouter, Role } = require('../../middlewares/role.js')

const serviceCommentBlog = require('./service')

const routeCommentBlog = express.Router()

routeCommentBlog.get('/', serviceCommentBlog.commentBlogGets)

routeCommentBlog.get(
  '/:id',
  serviceCommentBlog.existedCommentBlog,
  serviceCommentBlog.commentBlogGet
)

routeCommentBlog.post('/',  
roleRouter([Role.User, Role.Admin]),
serviceCommentBlog.commentBlogPost)

routeCommentBlog.put(
  '/:id',
  roleRouter([Role.User, Role.Admin]),
  serviceCommentBlog.existedCommentBlog,
  serviceCommentBlog.commentBlogUpdate
)

routeCommentBlog.delete(
  '/:id',
  roleRouter([Role.User, Role.Admin]),
  serviceCommentBlog.existedCommentBlog,
  serviceCommentBlog.commentBlogRemove
)

module.exports = routeCommentBlog
