import { createSlice } from "@reduxjs/toolkit";
import { actionGroupProductGets } from "./action.js";

const initialState = {
  groupProducts: [],
};

export const spliceGroupProduct = createSlice({
  name: "group-product",
  initialState,

  //handler reducer local
  reducers: {},
  //handler reducer global
  extraReducers: (builder) => {
    //gets group product success
    builder.addCase(
      actionGroupProductGets.fulfilled,
      (state, { meta, payload, type }) => {
 
        state.groupProducts = payload.data;
      }
    );
    //gets group product fail
    builder.addCase(
      actionGroupProductGets.rejected,
      (state, { meta, payload, type,error }) => {
        //message error
        console.log(error);
      }
    );
  },
});


export const {} = spliceGroupProduct.actions