import { createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../utils/notification.js";
import { actionProductCreate, actionProductGet, actionProductGets, actionProductRemove, actionProductUpdate, actionUserChangeStatus, actionUserGets, actionUserRemove } from "./action.js";

const initialState = {
  users: [],

};

export const spliceUser = createSlice({
  name: "user",
  initialState,

  //handler reducer local
  reducers: {
    refeshUsers:(state)=>{
      state.users=[]
    }
  },
  //handler reducer global
  extraReducers: (builder) => {
    //gets  user success
    builder.addCase(
      actionUserGets.fulfilled,
      (state, { meta, payload, type }) => {
        state.users = state.users.concat(payload.data);
      }
    );
    //gets  user fail
    builder.addCase(
      actionUserGets.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        console.log(error);
      }
    );

    //gets change status user success
    builder.addCase(
      actionUserChangeStatus.fulfilled,
      (state, { meta, payload, type }) => {
        openNotification("success", "Bạn đã thay đổi thành công!");
      }
    );
    //gets change status user fail
    builder.addCase(
      actionUserChangeStatus.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        openNotification("error", "Bạn đã thay đổi thất bại!");
      }
    );

    // //get change status user success
    // builder.addCase(
    //   actionProductGet.fulfilled,
    //   (state, { meta, payload, type }) => {
    //     state.product = payload.data;
    //   }
    // );
    // //get group product fail
    // builder.addCase(
    //   actionProductGet.rejected,
    //   (state, { meta, payload, type, error }) => {
    //     //message error
    //     console.log(error);
    //   }
    // );

    // //create  product success
    // builder.addCase(
    //   actionProductCreate.fulfilled,
    //   (state, { meta, payload, type }) => {
    //     openNotification("success","Bạn đã tạo mới thành công!")
    //   }
    // );
    // //create  product fail
    // builder.addCase(
    //   actionProductCreate.rejected,
    //   (state, { meta, payload, type, error }) => {
    //     //message error
    //      openNotification("error", "Bạn đã tạo mới thất bại!");
    //   }
    // );
    //remove  product success
    builder.addCase(
      actionUserRemove.fulfilled,
      (state, { meta, payload, type }) => {
        openNotification("success", "Bạn đã xóa thành công!");
              state.users=state.users.filter((item)=>item.id!==meta.arg.id)
      }
    );
    //remove  product fail
    builder.addCase(
      actionUserRemove.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        openNotification("error", "Bạn đã xóa thất bại!");
      }
    );
    // //update  product success
    // builder.addCase(
    //   actionProductUpdate.fulfilled,
    //   (state, { meta, payload, type }) => {
    //      openNotification("success", "Bạn đã update thành công!");
    //   }
    // );
    // //update  product fail
    // builder.addCase(
    //   actionProductUpdate.rejected,
    //   (state, { meta, payload, type, error }) => {
    //     //message error
    //      openNotification("error", "Bạn đã update thất bại!");
    //   }
    // );
  },
});


export const { refeshUsers } = spliceUser.actions;