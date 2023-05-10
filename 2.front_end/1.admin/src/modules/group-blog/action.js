import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGroupBlogGets } from "./api.js";



const actionGroupBlogGets =createAsyncThunk(
    "group-blogs/gets",
    async (payload,thunkAPI)=>{
        return await fetchGroupBlogGets();
    }
)

export { actionGroupBlogGets };
