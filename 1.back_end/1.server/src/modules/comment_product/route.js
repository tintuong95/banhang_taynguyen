const express = require('express');
const { roleRouter, Role } = require('../../middlewares/role.js');

const serviceCommentProduct = require("./service")

const routeCommentProduct = express.Router()

routeCommentProduct.get('/', serviceCommentProduct.commentProductGets)

routeCommentProduct.get('/:id', serviceCommentProduct.existedCommentProduct, serviceCommentProduct.commentProductGet)

routeCommentProduct.post(
  '/',
  roleRouter([Role.User, Role.Admin]),
  serviceCommentProduct.commentProductPost
)

routeCommentProduct.put(
  '/:id',
  roleRouter([Role.User, Role.Admin]),
  serviceCommentProduct.existedCommentProduct,
  serviceCommentProduct.commentProductUpdate
)

routeCommentProduct.delete(
  '/:id',
  roleRouter([Role.User, Role.Admin]),
  serviceCommentProduct.existedCommentProduct,
  serviceCommentProduct.commentProductRemove
)

module.exports = routeCommentProduct