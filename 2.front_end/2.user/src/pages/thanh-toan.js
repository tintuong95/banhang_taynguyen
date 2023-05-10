import axios from "axios";
import Image from "next/image.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import useSWR from "swr";
import Payment from "../components/common/Payment.js";
import Layout from "../components/Layout/Layout.js";
import {
  actionCartCreate,
  actionPaymentVnpay,
  actionUserCookie,
} from "../store/action.js";
import { getStatusPayment } from "../utils/statusVnpay.js";
import PopupAlert from "../utils/Swal.js";

const Checkout = () => {
  const dispatch = useDispatch();
  const { query, push } = useRouter();
  const [paymentType, setPaymentType] = useState("NHANHHANG");
  const { user, carts, paymentUrl } = useSelector(
    (state) => state.reducerStore
  );

  const [form, setForm] = useState({
    idUser: null,
    promo: null,
    province: null,
    name: null,
    district: null,
    phone: null,
    commune: null,
    address: null,
    shipping: null,
    payment: false,
  });

  const { data: provinces } = useSWR(
    process.env.NEXT_PUBLIC_URL_SHIPPING + "/master-data/province",
    fetcher
  );
  const { data: district } = useSWR(
    process.env.NEXT_PUBLIC_URL_SHIPPING +
      "/master-data/district?province_id=" +
      form.province,
    fetcher
  );

  const { data: commune } = useSWR(
    process.env.NEXT_PUBLIC_URL_SHIPPING +
      "/master-data/ward?district_id=" +
      form?.district,
    fetcher
  );

  const { data: services } = useSWR(
    process.env.NEXT_PUBLIC_URL_SHIPPING +
      "/v2/shipping-order/available-services?shop_id=" +
      process.env.NEXT_PUBLIC_SHOP_ID_SHIPPING +
      "&from_district=" +
      process.env.NEXT_PUBLIC_FORM_DISTRICT_SHIPPING +
      "&to_district=" +
      form.district,
    fetcher
  );

  const { data: fee } = useSWR(
    process.env.NEXT_PUBLIC_URL_SHIPPING +
      "/v2/shipping-order/fee?service_id=" +
      services?.data?.data[0]?.service_id +
      "&insurance_value=" +
      sumOrder(carts) +
      "&coupon&from_district_id=" +
      process.env.NEXT_PUBLIC_FORM_DISTRICT_SHIPPING +
      "&to_district_id=" +
      form?.district +
      "&to_ward_code=" +
      form?.commune +
      "&height=" +
      sizeOrder(carts) +
      "&length=" +
      sizeOrder(carts) +
      "&weight=" +
      weightOrder(carts) +
      "&width=" +
      sizeOrder(carts),
    fetcher
  );

  const onForm = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onPayment = () => {
 
    if (paymentType === "NHANHANG") {
      dispatch(actionCartCreate({ info: form, orderItems: carts }));
    } else {
      localStorage.setItem(
        "temp_carts",
        JSON.stringify({ info: form, orderItems: carts })
      );
      dispatch(
        actionPaymentVnpay({
          amount:
            sumOrder(carts) +
            Math.round(fee?.data.data.service_fee / 1000) * 1000,
        })
      );
    }
  };

  useEffect(() => {
    setForm({
      ...form,
      idUser: user?.id,
    });
  }, [user, carts]);

  useEffect(() => {
    setForm({
      ...form,
      shipping: Math.round(fee?.data.data.service_fee / 1000) * 1000,
    });
  }, [fee]);

  useEffect(() => {
    dispatch(actionUserCookie());
  }, []);

  useEffect(() => {
    if (paymentUrl) {
      push(paymentUrl);
    }
  }, [paymentUrl]);

  useEffect(() => {
    if (query["vnp_ResponseCode"] && query["vnp_ResponseCode"] !== "00") {
      PopupAlert(getStatusPayment(query["vnp_ResponseCode"])["vn"]);
    }
    if (query["vnp_ResponseCode"] === "00") {
      let order = JSON.parse(localStorage.getItem("temp_carts"));
      order.info.payment = true;
      dispatch(actionCartCreate(order));
    }
  }, [query]);

  return (
    <>
      <div className="w-2/5 m-auto  rounded-md p-5 pt-2">
        <div className="row mt-4 ">
          <div className="col-6 m-auto ">
            <h3 className="text-lg   mb-4 font-bold text-teal-600">THANH TOÁN</h3>
          </div>
        </div>
        <div className="">
          <div className="">
            <div className="">
              <form onSubmit={(e) => { onPayment(e) }}>
                <div className="">
                  <p className="">1. Thông tin người mua hàng</p>

                  <div className="form-outline">
                    <label htmlFor="" className="text-gray-600">
                      Họ tên
                    </label>
                    <div className="">
                      <input
                        onChange={(e) => {
                          onForm(e);
                        }}
                        type="text"
                        name="name"
                        className="border border-dashed border-teal-500 rounded-md p-2 w-full focus:outline-none"
                        placeholder="Vui lòng nhập "
                        required
                        
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="" className="text-gray-600">
                      Số điện thoại
                    </label>
                    <div className=" mb-3">
                      <input
                        onChange={(e) => {
                          onForm(e);
                        }}
                        type="phone"
                        name="phone"
                        className="border border-dashed border-teal-500 rounded-md p-2 w-full focus:outline-none"
                        placeholder="Vui lòng nhập "
                        required

                      
                      />
                    </div>
                  </div>
                </div>
                <div className="cus-address py-2 ">
                  <p className="normal-title">2. Địa chỉ nhận hàng</p>
                  <div className="grid grid-cols-3 gap-5 mt">
                    <div className="col-span-1">
                      <label htmlFor="" className="text-gray-600">
                        Tỉnh
                      </label>
                      <div className="input-group mb-3">
                        <select
                          className="border border-dashed border-teal-500 rounded-md p-2 w-full focus:outline-none"
                          name="province"
                          onChange={(e) => onForm(e)}
                          required
                        >
                          <option>Vui lòng chọn</option>
                          {provinces?.data?.data.map((item) => (
                            <option
                              key={item.ProvinceID}
                              value={item.ProvinceID}
                            >
                              {item.ProvinceName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-outline col-4">
                      <label htmlFor="" className="text-gray-600">
                        Huyện
                      </label>
                      <div className="input-group mb-3">
                        <select
                        required
                          className="border border-dashed border-teal-500 rounded-md p-2 w-full focus:outline-none"
                          name="district"
                          onChange={(e) => onForm(e)}
                        >
                          <option>Vui lòng chọn</option>
                          {district?.data?.data.map((item) => (
                            <option
                              key={item.DistrictID}
                              value={item.DistrictID}
                            >
                              {item.DistrictName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-outline col-4">
                      <label htmlFor="" className="text-gray-600">
                        Phường
                      </label>
                      <div className="input-group mb-3">
                        <select
                        required
                          className="border border-dashed border-teal-500 rounded-md p-2 w-full focus:outline-none"
                          name="commune"
                          onChange={(e) => onForm(e)}
                        >
                          <option>Vui lòng chọn</option>
                          {commune?.data?.data.map((item) => (
                            <option key={item.WardCode} value={item.WardCode}>
                              {item.WardName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-outline col-12 mt-2">
                    <label htmlFor="" className="text-gray-600">
                      Địa chỉ
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="address"
                        onChange={onForm}
                        className="border border-dashed border-teal-500 rounded-md p-2 w-full focus:outline-none"
                        placeholder="Vui lòng nhập "
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="cus-payment p-3">
                  <p className="normal-title">3. Hình thức thanh toán</p>
                  <Payment setPaymentType={setPaymentType} />
                </div>
                <div c className="border border-dashed border-teal-500 rounded-md  w-full p-4 ">
                  <p className="normal-title">4. Số tiền thanh toán</p>

                  <p className="">
                    Tiền hàng :&nbsp;
                    <span>{sumOrder(carts)?.toLocaleString("vi-VN")} đ</span>
                  </p>
                  <p className="">
                    Phí giao hàng :&nbsp;
                 
                    {fee?.data.data.service_fee?(Math.round(fee?.data.data.service_fee/1000)*1000).toLocaleString("vi-VN") :
                    0 }
                     &nbsp; đ
                  </p>
                  <p className="">
                    Tổng tiền hàng :
                    <span className="text-teal-500 font-semibold text-lg">
                      &nbsp;
                      {fee?.data.data.service_fee?(
                        sumOrder(carts) +
                        (Math.round(fee?.data.data.service_fee / 1000) * 1000 )
                      )?.toLocaleString("VI-vn") : sumOrder(carts).toLocaleString("VI-vn") }
                      &nbsp; đ
                    </span>
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    {/* <a className="cart-del-order p-3">XÓA GIỎ HÀNG</a> */}
                   <div>
                    <Link href="/gio-hang">
                        <a
                          className="col-span-1 w-full transition-all bg-gray-300 text-center p-3 hover:bg-gray-400 rounded-md shadow border border-gray-300 font-medium text-xl text-white"
                          type="submit"

                        >
                          TRỞ LẠI
                        </a></Link>
                   </div>
                   <div>
                      <button
                        className="col-span-1 w-full bg-teal-500 p-3 transition-all hover:bg-teal-400 border-teal-500 rounded-md shadow border font-medium text-xl text-white"
                        type=""

                      >
                        ĐẶT HÀNG
                      </button>
                   </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const fetcher = async (URL) => {
  return await axios({
    method: "GET",
    url: URL,
    headers: {
      token: process.env.NEXT_PUBLIC_TOKEN_SHIPPING,
      shop_id: process.env.NEXT_PUBLIC_SHOP_ID_SHIPPING,
    },
  });
};

//HOST ADDRESS SUPPER SHIP

const sizeOrder = (carts) => {
  const volume = carts?.reduce((a, b) => {
    const { height, length, width } = b.ProductCartItem;
    return a + height * length * width * b.quantity;
  }, 0);
  return Math.round(Math.cbrt(volume));
};

const weightOrder = (carts) =>
  carts?.reduce((a, b) => {
    const { weight } = b.ProductCartItem;
    return a + weight * b.quantity;
  }, 0);

const sumOrder = (carts) =>
  carts?.reduce((a, b) => {
    const { price } = b.ProductCartItem;
    return a + price * b.quantity;
  }, 0);

Checkout.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Checkout;
