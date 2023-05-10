import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBlogView,
  fetchCartCreate,
  fetchCartGet,
  fetchCartItemCreate,
  fetchCartItemDelete,
  fetchCartItemUpdate,
  fetchCommentBlog,
  fetchCommentBlogCreate,
  fetchCommentProduct,
  fetchCommentProductCreate,
  fetchNewsList,
  fetchOrderCancel,
  fetchOrderGetIdUser,
  fetchPaymentVnpay,
  fetchProductList,
  fetchProductListAmount,
  fetchProductView,
  fetchRateProductCreate,
  fetchUserCookie,
  fetchUserLogin,
  fetchUserLogout,
  fetchUserSignup,
} from "./fetcher.js";

export const actionUserLogin = createAsyncThunk(
  "user-login",
  async (payload, thunkAPI) => {
    return await fetchUserLogin(payload);
  }
);

export const actionUserSignup = createAsyncThunk(
  "user-signup",
  async (payload, thunkAPI) => {
    return await fetchUserSignup(payload);
  }
);

export const actionCartGets = createAsyncThunk(
  "cart-gets",
  async (payload, thunkAPI) => {
    return await fetchCartGet(payload);
  }
);

export const actionCartItemDelete = createAsyncThunk(
  "cart-item-delete",
  async (payload, thunkAPI) => {
    const response = await fetchCartItemDelete(payload);
    thunkAPI.dispatch(actionCartGets({ id: payload.idUser }));
    return  response;
  }
);

export const actionCartItemUpdate = createAsyncThunk(
  "cart-item-update",
  async (payload, thunkAPI) => {
    const response = await fetchCartItemUpdate({
      id: payload.id,
      quantity: payload.quantity,
    });
    thunkAPI.dispatch(actionCartGets({id:payload.idUser}))
    return  response;
  }
);

export const actionCartItemCreate = createAsyncThunk(
  "cart-item-create",
  async (payload, thunkAPI) => {
  const response =await fetchCartItemCreate(payload);
  await thunkAPI.dispatch(actionCartGets({ id: payload.idUser }));
    return response
  }
);

export const actionCartCreate = createAsyncThunk(
  "cart-create",
  async (payload, thunkAPI) => {
    return await fetchCartCreate(payload);
  }
);

export const actionUserCookie = createAsyncThunk(
  "user-cookie",
  async (payload, thunkAPI) => {
    return await fetchUserCookie(payload);
  }
);

export const actionCommentBlogCreate = createAsyncThunk(
  "comment-blog-create",
  async (payload, thunkAPI) => {
    const response = await fetchCommentBlogCreate(payload);
    await thunkAPI.dispatch(actionCommentBlogGet({ idBlog: payload.idBlog }));

    return response;
  }
);

export const actionCommentBlogGet = createAsyncThunk(
  "comment-blog-get",
  async (payload, thunkAPI) => {
    return await fetchCommentBlog(payload);
  }
);

export const actionCommentProductCreate = createAsyncThunk(
  "comment-product-create",
  async (payload, thunkAPI) => {
    const response = await fetchCommentProductCreate(payload);
    await thunkAPI.dispatch(
      actionCommentProductGet({ idProduct: payload.idProduct })
    );

    return response;
  }
);

export const actionCommentProductGet = createAsyncThunk(
  "comment-product-get",
  async (payload, thunkAPI) => {
    return await fetchCommentProduct(payload);
  }
);

export const actionRateProductCreate = createAsyncThunk(
  "rate-product-create",
  async (payload, thunkAPI) => {
    return await fetchRateProductCreate(payload);
  }
);

export const actionOrderGetIdUser = createAsyncThunk(
  "order-idUser",
  async (payload, thunkAPI) => {
    return await fetchOrderGetIdUser(payload);
  }
);

export const actionOrderCancel = createAsyncThunk(
  "order-cancel",
  async (payload, thunkAPI) => {
    const response = await fetchOrderCancel(payload);
    thunkAPI.dispatch(actionOrderGetIdUser({ idUser: payload.idUser }));

    return response;
  }
);

export const actionUserLogout = createAsyncThunk(
  "user-logout",
  async (payload, thunkAPI) => {
    return await fetchUserLogout();
  }
);


export const actionPaymentVnpay = createAsyncThunk(
  "payment-vnpay",
  async (payload, thunkAPI) => {
    return await fetchPaymentVnpay(payload);
  }
);


export const actionBlogView = createAsyncThunk(
  "blog-view",
  async (payload, thunkAPI) => {
    return await fetchBlogView(payload);
  }
);

export const actionProductView = createAsyncThunk(
  "product-view",
  async (payload, thunkAPI) => {
    return await fetchProductView(payload);
  }
);


export const actionProductListAmount = createAsyncThunk(
  "product-amount",
  async (payload, thunkAPI) => {
    return await fetchProductListAmount(payload);
  }
);

export const actionProductList = createAsyncThunk(
  "product-list",
  async (payload, thunkAPI) => {
    return await fetchProductList(payload);
  }
);

export const actionProductListAdd = createAsyncThunk(
  "product-list-add",
  async (payload, thunkAPI) => {
    return await fetchProductList(payload);
  }
);


export const actionNewsList = createAsyncThunk(
  "news-list",
  async (payload, thunkAPI) => {
    return await fetchNewsList(payload);
  }
);

export const actionNewsListAdd = createAsyncThunk(
  "news-list-add",
  async (payload, thunkAPI) => {
    return await fetchNewsList(payload);
  }
);


export const actionProductListSearch = createAsyncThunk(
  "product-list-search",
  async (payload, thunkAPI) => {
    return await fetchProductList(payload);
  }
);


