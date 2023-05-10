import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRatingsGets, fetchRatingsRemove } from "./api";

const actionRatingsGets = createAsyncThunk(
  "ratings/gets",
  async (payload, thunkAPI) => {
    return await fetchRatingsGets(payload);
  }
);

const actionRatingsRemove = createAsyncThunk(
  "ratings/remove",
  async (payload, thunkAPI) => {
    const response = await fetchRatingsRemove(payload);
    thunkAPI.dispatch(actionRatingsGets(payload));
    return await response;
  }
);
export { actionRatingsRemove, actionRatingsGets };
