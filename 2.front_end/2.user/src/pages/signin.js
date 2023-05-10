import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout.js";
import { useDispatch } from "react-redux";
import { actionUserLogin, actionUserSignup } from "../store/action.js";

import Image from "next/image.js";
import useCaptcha from "../hooks/useCaptcha.js";

import useFireBase from "../hooks/useFireBase.js";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
 const providerFacebook = new FacebookAuthProvider();

 const providerGoogle = new GoogleAuthProvider();

providerFacebook.setCustomParameters({
  display: "popup",
});
providerGoogle.setCustomParameters({
  display: "popup",
});
const Signin = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState();
  const {state,CaptchaComponent} =useCaptcha()
    const [user, authGoogleAuth, idToken] = useFireBase();
  const onSubmit = async (e) => {
    e.preventDefault();
    if(!state){
       return Swal.fire({
        title: "ERROR!",
        text: "Vui lòng nhập xác nhận!",
        imageUrl: "https://i.imgur.com/0EEwoh9.png",
        imageWidth: 400,

        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Xác nhận",
      });
    }
    if (form.password !== form.rePassword) {
      return Swal.fire({
        title: "ERROR!",
        text: "Mật khẩu không khớp !",
        imageUrl: "https://i.imgur.com/0EEwoh9.png",
        imageWidth: 400,

        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Xác nhận",
      });
    }

    dispatch(actionUserSignup(form));
  };

  return (
    <div className=" flex  justify-center items-center mt-10 ">
      <div style={{ width: 500 }}>
        <form  onSubmit={onSubmit}  >
          <h3 className="text-2xl mb-4 font-bold text-teal-600">
          ĐĂNG KÝ
        </h3>
        <div className="flex flex-col " >
          <div className="flex flex-col ">
            <label className="mb-2">Họ tên </label>
            <input
              onChange={(e) => {
                setForm({ ...form, fullname: e.target.value });
              }}
              type="text"
                className="border border-teal-500 p-2 rounded"
              style={{ width: "100% !important" }}
              required
            />
          </div>
            <div className="flex flex-col mt-4">
            <label className="mb-2">Số điện thoại </label>
            <input
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
              }}
              type="text"
                className="border border-teal-500 p-2 rounded"
              style={{ width: "100% !important" }}
              required
            />
          </div>
        </div>
          <div className="flex flex-col  mt-4">

          <label className="mb-2">Địa chỉ </label>
          <input
            onChange={(e) => {
              setForm({ ...form, address: e.target.value });
            }}
            type="text"
              className="border border-teal-500 p-2 rounded"
           
            required
          />
        </div>
          <div className="flex flex-col  mt-4">
          <label className="mb-2">Tên đăng nhập</label>
          <input
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
            type="text"
              className="border border-teal-500 p-2 rounded"

            required
          />
        </div>
   
          <div className="flex flex-col  mt-4">
            <label className="mb-2">Mật khẩu</label>
            <input
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              type="password"
                className="border border-teal-500 p-2 rounded"
              style={{ width: "100% !important" }}
              required
            />
 
            <div className="flex flex-col  mt-4">
            <label className="mb-2">Nhập lại mật khẩu</label>
            <input
              onChange={(e) => {
                setForm({ ...form, rePassword: e.target.value });
              }}
              type="password"
                className="border border-teal-500 p-2 rounded"
              style={{ width: "100% !important" }}
              required
            />
          </div>
        </div>
     
        <button className="bg-teal-500 mt-10 text-white p-2 w-full rounded">
          XÁC NHẬN
        </button>
        </form>
        <p className="text-center my-3">Đăng nhập với</p>
        <div className="flex gap-3">
           <button onClick={() => {
              authGoogleAuth(providerGoogle);
          }} className="bg-rose-500 flex justify-center p-2 w-full rounded text-white gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Google</button>
          <button   onClick={() => {
              authGoogleAuth(providerFacebook);
          }} className="bg-blue-500 flex justify-center p-2 w-full rounded text-white gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="#ffffff"
            >
              <path d="M22.5 0c.83 0 1.5.67 1.5 1.5v21c0 .83-.67 1.5-1.5 1.5h-6v-9h3l.75-3.75H16.5v-1.5c0-1.5.75-2.25 2.25-2.25h1.5V3.75h-3c-2.76 0-4.5 2.16-4.5 5.25v2.25h-3V15h3v9H1.5A1.5 1.5 0 0 1 0 22.5v-21C0 .67.67 0 1.5 0h21z" />
            </svg>
            Facebook</button>
        </div>
      </div>
    </div>
  );
};

Signin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Signin;
