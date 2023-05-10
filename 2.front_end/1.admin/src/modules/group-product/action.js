import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGroupProductGets } from "./api.js";



const actionGroupProductGets =createAsyncThunk(
    "group-product/gets",
    async (payload,thunkAPI)=>{
        return await fetchGroupProductGets()
    }
)

export { actionGroupProductGets };
