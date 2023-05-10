import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import ColumnChart from "../components/CharColumn.jsx";
import AnimateNumber from "../components/AnimateNumber.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  actionOrderCounterData,
  actionOrderCounterMonth,
  actionOrderCounterWeekData,
  actionOrderTotalCounter,
  actionOrderTotalData,
  actionOrderTotalTurnOver,
  actionOrderTurnOverMonth,
  actionOrderTurnOverWeekData,
} from "../modules/order/action.js";

const Home = () => {
  const dispatch = useDispatch();
  const {
    turnOver,
    turnOverMonth,
    counterMonth,
    counterTotal,
    totalData,
    counterData,
    totalWeek,
    couterWeek
  } = useSelector((state) => state.orderReducer);
  useEffect(() => {
    dispatch(actionOrderTotalTurnOver());
    dispatch(actionOrderTurnOverMonth());
    dispatch(actionOrderTotalCounter());
    dispatch(actionOrderCounterMonth());
    dispatch(actionOrderTotalData());
    dispatch(actionOrderCounterData());
     dispatch(actionOrderTurnOverWeekData());
      dispatch(actionOrderCounterWeekData());
  }, []);
  console.log("couterWeek", couterWeek);
  return (

      <div className="w-full ">
      <div className="grid  grid-cols-4  gap-4 w-full mb-4">
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col text-center ">
          <img
            width={100}
            alt="money"
            className="m-auto"
            src="https://img.icons8.com/bubbles/100/000000/money.png"
          />

          <p className="font-semibold text-2xl  text-slate-600">
            <AnimateNumber type="currency" number={Number(turnOver)} />
          </p>
          <p className=" text-slate-600 text-base">TỔNG DOANH THU (VND)</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col text-center">
          <img
            width={100}
            alt="money"
            className="m-auto"
            src="https://img.icons8.com/clouds/100/000000/money.png"
          />

          <p className="font-semibold text-2xl  text-slate-600">
            <AnimateNumber number={Number(counterTotal)} />
          </p>
          <p className=" text-slate-600 text-base">TỔNG ĐƠN HÀNG (ĐƠN)</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col text-center">
          <img
            width={100}
            alt="money"
            className="m-auto"
            src="https://img.icons8.com/clouds/100/000000/money-bag.png"
          />

          <p className="font-semibold text-2xl  text-slate-600">
            <AnimateNumber type="currency" number={Number(turnOverMonth)} />
          </p>
          <p className=" text-slate-600 text-base">DOANH THU THÁNG (VND)</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col text-center">
          <img
            width={100}
            alt="money"
            className="m-auto"
            src="https://img.icons8.com/bubbles/100/000000/money-bag.png"
          />

          <p className="font-semibold text-2xl  text-slate-600">
            <AnimateNumber number={Number(counterMonth)} />
          </p>
          <p className=" text-slate-600 text-base">ĐƠN TRONG THÁNG (ĐƠN)</p>
        </div>
      </div>

      <div className="grid  grid-cols-2 mt-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-12 pb-6 ">
          <ColumnChart data={totalWeek?.slice(-7)} />
          <p className=" text-slate-600 text-base mt-4 text-center">
            DOANH SỐ TRONG TUẦN
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-12 pb-6 ">
          <ColumnChart data={couterWeek?.slice(-7)} />
          <p className=" text-slate-600 text-base mt-4 text-center">
            ĐƠN HÀNG TRONG TUẦN
          </p>
        </div>
      </div>
      <div className="grid  grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-xl shadow-lg p-12 pb-6 ">
          <ColumnChart data={totalData.slice(-7)} />
          <p className=" text-slate-600 text-base mt-4 text-center">
            DOANH SỐ TRONG NĂM
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-12 pb-6 ">
          <ColumnChart data={counterData.slice(-7)} />
          <p className=" text-slate-600 text-base mt-4 text-center">
            ĐƠN HÀNG TRONG NĂM
          </p>
        </div>
      </div>
    </div>

  );
};

export default Home;
