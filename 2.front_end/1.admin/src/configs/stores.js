import { configureStore } from "@reduxjs/toolkit";
import { sliceAdmin } from "../modules/admin/reducer.js";
import { spliceCommentBlog } from "../modules/comment-blog/reducer.js";
import { spliceCommentProduct } from "../modules/comment-product/reducer.js";
import { spliceGroupBlog } from "../modules/group-blog/reducer.js";
import { spliceGroupProduct } from "../modules/group-product/reducer.js";
import { sliceOrder } from "../modules/order/reducer.js";
import { spliceProduct } from "../modules/product/reducer.js";
import { spliceRatings } from "../modules/ratings/reducer.js";
import { spliceUser } from "../modules/user/reducer.js";
import { spliceBlogs } from './../modules/blog/reducer';

export const store = configureStore({
  reducer: {
    blogReducer: spliceBlogs.reducer,
    groupProductReducer: spliceGroupProduct.reducer,
    productReducer: spliceProduct.reducer,
    adminReducer: sliceAdmin.reducer,
    orderReducer: sliceOrder.reducer,
    groupBlogReducer: spliceGroupBlog.reducer,
    userReducer: spliceUser.reducer,
    commentProductReducer: spliceCommentProduct.reducer,
    commentBlogReducer: spliceCommentBlog.reducer,
    ratingsReducer: spliceRatings.reducer

  },
});