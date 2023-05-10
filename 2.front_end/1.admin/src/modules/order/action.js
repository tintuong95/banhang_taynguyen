import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchOrderCounterData,
    fetchOrderCounterMonth,
    fetchOrderCounterWeekData,
    fetchOrderGetAll,
    fetchOrderGets,
    fetchOrderRemove,
    fetchOrderTotalCouter,
    fetchOrderTotalData,
    fetchOrderTotalTurnOver,
    fetchOrderTurnOverMonth,
    fetchOrderTurnOverWeekData,
    fetchChangeStatus
} from "./api.js";

const actionOrderGets = createAsyncThunk(
    "order/gets",
    async(payload, thunkAPI) => {
        return fetchOrderGets(payload);
    }
);

const actionOrderTotalTurnOver = createAsyncThunk(
    "order/total-turn-over",
    async(payload, thunkAPI) => {
        return fetchOrderTotalTurnOver();
    }
);

const actionOrderTurnOverMonth = createAsyncThunk(
    "order/total-turn-over-month",
    async(payload, thunkAPI) => {
        return fetchOrderTurnOverMonth();
    }
);

const actionOrderTotalCounter = createAsyncThunk(
    "order/total-counter",
    async(payload, thunkAPI) => {
        return fetchOrderTotalCouter();
    }
);

const actionOrderCounterData = createAsyncThunk(
    "order/total-counter-data",
    async(payload, thunkAPI) => {
        return fetchOrderCounterData();
    }
);

const actionOrderTotalData = createAsyncThunk(
    "order/total-data",
    async(payload, thunkAPI) => {
        return fetchOrderTotalData();
    }
);

const actionOrderCounterMonth = createAsyncThunk(
    "order/total-month-counter",
    async(payload, thunkAPI) => {
        return fetchOrderCounterMonth();
    }
);

const actionOrderCounterWeekData = createAsyncThunk(
    "order/total-week-counter",
    async(payload, thunkAPI) => {
        return fetchOrderCounterWeekData();
    }
);

const actionOrderTurnOverWeekData = createAsyncThunk(
    "order/total-week-turn-over",
    async(payload, thunkAPI) => {
        return fetchOrderTurnOverWeekData();
    }
);

const actionOrderDelete = createAsyncThunk(
    "order/delete",
    async(payload, thunkAPI) => {
        const response = await fetchOrderRemove(payload);
        // thunkAPI.dispatch(actionOrderGets());

        return response;
    }
);

const actionOrderChangeStatus = createAsyncThunk(
    "order/status",
    async(payload, thunkAPI) => {
        const response = await fetchChangeStatus(payload);
        return response;
    }
);

export {
    actionOrderCounterMonth,
    actionOrderTurnOverMonth,
    actionOrderGets,
    actionOrderDelete,
    actionOrderTotalTurnOver,
    actionOrderTotalCounter,
    actionOrderTotalData,
    actionOrderCounterData,
    actionOrderTurnOverWeekData,
    actionOrderCounterWeekData,
    actionOrderChangeStatus,
};