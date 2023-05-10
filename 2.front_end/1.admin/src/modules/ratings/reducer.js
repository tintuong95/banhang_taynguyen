import {createSlice} from "@reduxjs/toolkit"
import { openNotification } from "../../utils/notification.js";
import {actionRatingsGets, actionRatingsRemove} from "./action"

const initialState = {
  ratings:[]
}

export const spliceRatings = createSlice({
    name: "ratings-product",
    initialState,
    extraReducers: (builder) => {
      // gets Blogs success
      builder.addCase(
        actionRatingsGets.fulfilled,
        (state, { meta, payload, type }) => {
          state.ratings = payload.data;
        }
      );

      // gets Blogs fail
      builder.addCase(
        actionRatingsGets.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          console.log(error)
        }
      );

      // Remove Blogs success
      builder.addCase(
        actionRatingsRemove.fulfilled,
        (state, { meta, payload, type }) => {
          openNotification("success", "Bạn đã xóa thành công!");
        }
      );

      // Remove Blogs fail
      builder.addCase(
        actionRatingsRemove.rejected,
        (state, { meta, payload, type }, error) => {
          //message error
          openNotification("error", "Bạn đã xóa thất bại!");
        }
      );
    }
})

export const {} = spliceRatings.actions;