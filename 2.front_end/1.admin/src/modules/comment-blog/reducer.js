import {createSlice} from "@reduxjs/toolkit"
import { openNotification } from "../../utils/notification.js";
import {actionCommentBlogGets, actionCommentBlogRemove} from "./action"

const initialState = {
  commentBlogs:[]
}

export const spliceCommentBlog = createSlice({
    name: "comment-Blog",
    initialState,
    extraReducers: (builder) => {
      // gets Blogs success
      builder.addCase(
        actionCommentBlogGets.fulfilled,
        (state, { meta, payload, type }) => {
          state.commentBlogs=payload.data
        }
      );

      // gets Blogs fail
      builder.addCase(
        actionCommentBlogGets.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          console.log(error)
        }
      );

      // Remove Blogs success
      builder.addCase(
        actionCommentBlogRemove.fulfilled,
        (state, { meta, payload, type }) => {
          openNotification("success", "Bạn đã xóa thành công!");
        }
      );

      // Remove Blogs fail
      builder.addCase(
        actionCommentBlogRemove.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          openNotification("error", "Bạn đã xóa thất bại!");
        }
      );
    }
})

export const {} = spliceCommentBlog.actions;