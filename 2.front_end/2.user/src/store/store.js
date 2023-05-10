import { configureStore } from "@reduxjs/toolkit";
import { storeSlice } from "./reducer.js";

export const store = configureStore({
  reducer: {
    reducerStore: storeSlice.reducer,
  },
});
