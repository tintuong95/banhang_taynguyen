const express = require('express');
const routeAdmin = require('../modules/admin/route.js');
const routeBlog = require('../modules/blog/route.js');
const routeCartItem = require('../modules/cart_item/route.js');
const routeCommentBlog = require('../modules/comment_blog/route.js');
const routeCommentProduct = require('../modules/comment_product/route.js');
const routeGroupBlog = require('../modules/group_blog/route.js');
const routeGroupProduct = require('../modules/group_product/route.js');
const routeImage = require('../modules/image/route.js');
const routeOrder = require('../modules/order/route.js');
const routeOrderItem = require('../modules/order_item/route.js');
const routePayment = require('../modules/payment/router.js');

const routeProduct = require('../modules/product/route.js');
const routeRatings = require('../modules/ratings/route.js');
const routeUser = require('../modules/user/route.js');

const routeRoot = express.Router()

routeRoot.use("/admin", routeAdmin)

routeRoot.use('/user', routeUser)

routeRoot.use('/product', routeProduct)

routeRoot.use('/group-product', routeGroupProduct)

routeRoot.use('/group-blog', routeGroupBlog)

routeRoot.use('/order', routeOrder)

routeRoot.use('/order-item', routeOrderItem)

routeRoot.use('/cart-item', routeCartItem)

routeRoot.use('/comment-product', routeCommentProduct)

routeRoot.use('/blog', routeBlog)

routeRoot.use('/comment-blog', routeCommentBlog)

routeRoot.use('/images', routeImage)

routeRoot.use('/ratings', routeRatings)

routeRoot.use('/payment', routePayment)

module.exports = routeRoot