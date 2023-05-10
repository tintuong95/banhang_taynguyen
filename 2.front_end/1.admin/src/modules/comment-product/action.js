import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCommentProductsGets, fetchCommentProductsRemove } from "./api";

const actionCommentProductGets = createAsyncThunk(
  "comment-product/gets",
  async (payload, thunkAPI) => {
    return await fetchCommentProductsGets(payload);
  }
);

const actionCommentProductRemove = createAsyncThunk(
  "comment-product/remove",
  async (payload, thunkAPI) => {
    const response = await fetchCommentProductsRemove(payload);
    thunkAPI.dispatch(actionCommentProductGets(payload));
    return await response;
  }
);
export { actionCommentProductRemove, actionCommentProductGets };
