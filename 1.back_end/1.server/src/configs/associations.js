const Blog = require("../modules/blog/model.js");
const CartItem = require("../modules/cart_item/model.js");
const CommentBlog = require("../modules/comment_blog/model.js");
const CommentProduct = require("../modules/comment_product/model.js");
const GroupBlog = require("../modules/group_blog/model.js");
const GroupProduct = require("../modules/group_product/model.js");
const Image = require("../modules/image/model.js");
const Order = require("../modules/order/model.js");
const OrderItem = require("../modules/order_item/model.js");
const Product = require("../modules/product/model.js");
const Ratings = require("../modules/ratings/model.js");
const User = require("../modules/user/model.js");


Order.hasMany(OrderItem, { foreignKey: 'idOrder', as :"OrderOrderItem"})
OrderItem.belongsTo(Order, { foreignKey: 'idOrder', as: 'OrderOrderItem' })

Product.hasMany(OrderItem, { foreignKey: 'idProduct', as: 'OrderItemProduct' })
OrderItem.belongsTo(Product, { foreignKey: 'idProduct', as: 'OrderItemProduct' })

User.hasMany(Order, { foreignKey: 'idUser', as: 'UserOrder' })
Order.belongsTo(User, { foreignKey: 'idUser', as: 'UserOrder' })

Product.hasMany(CommentProduct, { foreignKey: 'idProduct', as: 'ProductComment' })
CommentProduct.belongsTo(Product, { foreignKey: 'idProduct', as: 'ProductComment' })

User.hasMany(CommentProduct, { foreignKey: 'idUser', as: 'UserCommentProduct' })
CommentProduct.belongsTo(User, { foreignKey: 'idUser', as: 'UserCommentProduct' })


Blog.hasMany(CommentBlog, { foreignKey: 'idBlog', as: 'BlogComment' })
CommentBlog.belongsTo(Blog, { foreignKey: 'idBlog', as: 'BlogComment' })

User.hasMany(CommentBlog, { foreignKey: 'idUser', as: 'UserCommentBlog' })
CommentBlog.belongsTo(User, { foreignKey: 'idUser', as: 'UserCommentBlog' })

User.hasMany(Ratings, { foreignKey: 'idUser', as: 'UserRatings' })
Ratings.belongsTo(User, { foreignKey: 'idUser', as: 'UserRatings' })

Product.hasMany(Ratings, { foreignKey: 'idProduct', as: 'ProductRatings' })
Ratings.belongsTo(Product, { foreignKey: 'idProduct', as: 'ProductRatings' })

GroupBlog.hasMany(Blog, { foreignKey: 'idGroupBlog', as: 'GroupBlogBlog' })
Blog.belongsTo(GroupBlog, { foreignKey: 'idGroupBlog', as: 'GroupBlogBlog' })

GroupProduct.hasMany(Product, { foreignKey: 'idGroupProduct', as: 'GroupProductProduct' })
Product.belongsTo(GroupProduct, { foreignKey: 'idGroupProduct', as: 'GroupProductProduct' })

Product.hasMany(Image, { foreignKey: 'idProduct', as: 'ProductImage' })
Image.belongsTo(Product, { foreignKey: 'idProduct', as: 'ProductImage' })


User.hasMany(CartItem, { foreignKey: 'idUser', as: 'UserCartItem' })
CartItem.belongsTo(User, { foreignKey: 'idUser', as: 'UserCartItem' })

Product.hasOne(CartItem, { foreignKey: 'idProduct', as: 'ProductCartItem' })
CartItem.belongsTo(Product, { foreignKey: 'idProduct', as: 'ProductCartItem' })


