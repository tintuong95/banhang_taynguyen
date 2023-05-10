import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCommentBlogsGets, fetchCommentBlogsRemove } from "./api";

const actionCommentBlogGets = createAsyncThunk(
  "comment-Blog/gets",
  async (payload, thunkAPI) => {
    return await fetchCommentBlogsGets(payload);
  }
);

const actionCommentBlogRemove = createAsyncThunk(
  "comment-Blog/remove",
  async (payload, thunkAPI) => {
    const response = await fetchCommentBlogsRemove(payload);
    thunkAPI.dispatch(actionCommentBlogGets(payload));
    return await response;
  }
);
export { actionCommentBlogRemove, actionCommentBlogGets };
