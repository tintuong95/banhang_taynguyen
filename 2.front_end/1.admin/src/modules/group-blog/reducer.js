import { createSlice } from "@reduxjs/toolkit";
import { actionGroupBlogGets } from "./action.js";

const initialState = {
  groupBlogs: [],
};

export const spliceGroupBlog = createSlice({
  name: "group-blog",
  initialState,

  //handler reducer local
  reducers: {},
  //handler reducer global
  extraReducers: (builder) => {
    //gets group product success
    builder.addCase(
      actionGroupBlogGets.fulfilled,
      (state, { meta, payload, type }) => {
        state.groupBlogs = payload.data;
        console.log(" state.groupBlogs", state.groupBlogs)
      }
    );
    //gets group product fail
    builder.addCase(
      actionGroupBlogGets.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        console.log(error);
      }
    );
  },
});


export const {} = spliceGroupBlog.actions;