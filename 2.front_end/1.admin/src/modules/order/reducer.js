import { createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../utils/notification.js";
import { actionOrderChangeStatus, actionOrderCounterData, actionOrderCounterMonth, actionOrderCounterWeekData, actionOrderDelete, actionOrderGetAll, actionOrderGets, actionOrderTotalCounter, actionOrderTotalData, actionOrderTotalTurnOver, actionOrderTurnOverMonth, actionOrderTurnOverWeekData } from "./action.js";

const initialState = {
    orders: [],
    turnOver: 0,
    turnOverMonth: 0,
    counterMonth: 0,
    counterTotal: 0,
    counterData: [],
    totalData: [],
    couterWeek: [],
    totalWeek: [],
};

export const sliceOrder = createSlice({
    name: "order",
    initialState,
    reducers: {
        refeshOrder: (state) => {
            state.orders = []
        }
    },
    extraReducers: (builder) => {
        //gets order success
        builder.addCase(
            actionOrderGets.fulfilled,
            (state, { meta, payload, type }) => {
                state.orders = state.orders.concat(payload.data);
            }
        );
        //gets order success
        builder.addCase(
            actionOrderGets.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //gets order turn over success
        builder.addCase(
            actionOrderTotalTurnOver.fulfilled,
            (state, { meta, payload, type }) => {
                state.turnOver = payload.data;
            }
        );
        //gets order turn over failure
        builder.addCase(
            actionOrderTotalTurnOver.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //gets order turn over month success
        builder.addCase(
            actionOrderTurnOverMonth.fulfilled,
            (state, { meta, payload, type }) => {
                state.turnOverMonth = payload.data;
            }
        );
        //gets order turn over month failure
        builder.addCase(
            actionOrderTurnOverMonth.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //gets order couter month success
        builder.addCase(
            actionOrderCounterMonth.fulfilled,
            (state, { meta, payload, type }) => {
                state.counterMonth = payload.data;
            }
        );
        //gets order couter month failure
        builder.addCase(
            actionOrderCounterMonth.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //gets order couter total success
        builder.addCase(
            actionOrderTotalCounter.fulfilled,
            (state, { meta, payload, type }) => {
                state.counterTotal = payload.data;
            }
        );
        //gets order couter total failure
        builder.addCase(
            actionOrderTotalCounter.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //gets order couter total data success
        builder.addCase(
            actionOrderCounterData.fulfilled,
            (state, { meta, payload, type }) => {
                state.counterData = payload.data;
            }
        );
        //gets order couter total data failure
        builder.addCase(
            actionOrderCounterData.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //gets order  total data success
        builder.addCase(
            actionOrderTotalData.fulfilled,
            (state, { meta, payload, type }) => {
                state.totalData = payload.data;
            }
        );
        //gets order  total data failure
        builder.addCase(
            actionOrderTotalData.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //gets order  total data success tintuong
        builder.addCase(
            actionOrderCounterWeekData.fulfilled,
            (state, { meta, payload, type }) => {
                state.couterWeek = payload.data;
            }
        );
        //gets order  total data failure
        builder.addCase(
            actionOrderCounterWeekData.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //gets order  total data success tintuong
        builder.addCase(
            actionOrderTurnOverWeekData.fulfilled,
            (state, { meta, payload, type }) => {
                state.totalWeek = payload.data;
            }
        );
        //gets order  total data failure
        builder.addCase(
            actionOrderTurnOverWeekData.rejected,
            (state, { meta, payload, type, error }) => {
                console.log(error);
            }
        );

        //remove order success
        builder.addCase(
            actionOrderDelete.fulfilled,
            (state, { meta, payload, type }) => {
                openNotification("success", "Bạn đã xóa thành công!");
                state.orders=state.orders.filter((item)=>item.id!==meta.arg.id)
            }
        );
        //gets order success
        builder.addCase(
            actionOrderDelete.rejected,
            (state, { meta, payload, type, error }) => {
                openNotification("error", "Bạn đã xóa thất bại!");
              
            }
        );
        //gets order change status
        builder.addCase(
            actionOrderChangeStatus.fulfilled,
            (state, { meta, payload, type, error }) => {
                openNotification("success", "Bạn đã thay đổi thành công!");
            }
        );
        //gets order change status
        builder.addCase(
            actionOrderChangeStatus.rejected,
            (state, { meta, payload, type, error }) => {
                openNotification("error", "Bạn đã thay đổi thất bại!");
            }
        );
    }
})

export const { refeshOrder } = sliceOrder.actions;