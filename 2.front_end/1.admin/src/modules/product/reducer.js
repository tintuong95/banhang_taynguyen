import { createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../utils/notification.js";
import { actionProductChangeStatus, actionProductCreate, actionProductGet, actionProductGets, actionProductRemove, actionProductUpdate } from "./action.js";

const initialState = {
  products: [],
  product:{},
};

export const spliceProduct = createSlice({
  name: "product",
  initialState,

  //handler reducer local
  reducers: {
    refeshProducts:(state)=>{
      state.products=[]
    }
  },
  //handler reducer global
  extraReducers: (builder) => {
    //gets group product success
    builder.addCase(
      actionProductGets.fulfilled,
      (state, { meta, payload, type }) => {

        state.products = state.products.concat(payload.data);
      }
    );
    //gets group product fail
    builder.addCase(
      actionProductGets.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        console.log(error);
      }
    );
    //gets change status product success
    builder.addCase(
      actionProductChangeStatus.fulfilled,
      (state, { meta, payload, type }) => {
        openNotification("success", "Bạn đã thay đổi thành công!");
      }
    );
    //gets change status product failure
    builder.addCase(
      actionProductChangeStatus.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        openNotification("error", "Bạn thay đổi thất bại!");
      }
    );

    //get group product success
    builder.addCase(
      actionProductGet.fulfilled,
      (state, { meta, payload, type }) => {
        state.product = payload.data;
      }
    );
    //get group product fail
    builder.addCase(
      actionProductGet.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        console.log(error);
      }
    );

    //create  product success
    builder.addCase(
      actionProductCreate.fulfilled,
      (state, { meta, payload, type }) => {
         window.location.href="/product"
        openNotification("success", "Bạn đã tạo mới thành công!");
       
      }
    );
    //create  product fail
    builder.addCase(
      actionProductCreate.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        openNotification("error", "Bạn đã tạo mới thất bại!");
      }
    );
    //remove  product success
    builder.addCase(
      actionProductRemove.fulfilled,
      (state, { meta, payload, type }) => {
        openNotification("success", "Bạn đã xóa thành công !!");
        state.products=state.products.filter((item)=>item.id!==meta.arg.id)
      }
    );
    //remove  product fail
    builder.addCase(
      actionProductRemove.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        openNotification("error", "Bạn đã xóa thất bại!");
      }
    );
    //update  product success
    builder.addCase(
      actionProductUpdate.fulfilled,
      (state, { meta, payload, type }) => {
        openNotification("success", "Bạn đã update thành công!");
      }
    );
    //update  product fail
    builder.addCase(
      actionProductUpdate.rejected,
      (state, { meta, payload, type, error }) => {
        //message error
        openNotification("error", "Bạn đã update thất bại!");
      }
    );
  },
});


export const { refeshProducts } = spliceProduct.actions;