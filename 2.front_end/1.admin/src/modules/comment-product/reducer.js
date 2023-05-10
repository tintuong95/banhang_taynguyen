import {createSlice} from "@reduxjs/toolkit"
import { openNotification } from "../../utils/notification.js";
import {actionCommentProductGets, actionCommentProductRemove} from "./action"

const initialState = {
  commentProducts:[]
}

export const spliceCommentProduct = createSlice({
    name: "comment-product",
    initialState,
    extraReducers: (builder) => {
      // gets Blogs success
      builder.addCase(
        actionCommentProductGets.fulfilled,
        (state, { meta, payload, type }) => {
          state.commentProducts=payload.data
        }
      );

      // gets Blogs fail
      builder.addCase(
        actionCommentProductGets.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          console.log(error)
        }
      );

      // Remove Blogs success
      builder.addCase(
        actionCommentProductRemove.fulfilled,
        (state, { meta, payload, type }) => {
          openNotification("success", "Bạn đã xóa thành công!");
        }
      );

      // Remove Blogs fail
      builder.addCase(
        actionCommentProductRemove.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          openNotification("error", "Bạn đã xóa thất bại!");
        }
      );
    }
})

export const {} = spliceCommentProduct.actions;