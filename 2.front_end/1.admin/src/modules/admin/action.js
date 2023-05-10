import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAdminLogin, fetchAdminProfile } from "./api.js";

const actionAdminProfile = createAsyncThunk(
  "action_admin_profile",
  async (payload, thunkAPI) => {
    return await fetchAdminProfile();
  }
);

const actionAdminLogin = createAsyncThunk(
  "action_admin_login",
  async (payload, thunkAPI) => {
    return await fetchAdminLogin(payload);
  }
);

export { actionAdminProfile, actionAdminLogin };
