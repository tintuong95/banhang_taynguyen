import Image from "next/image.js";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout.js";
import useCaptcha from "../hooks/useCaptcha.js";
import { fetchUpdateUser } from "../store/fetcher.js";

const ThongTin = () => {
  const {user}=useSelector(state=>state.reducerStore)
  const [infoUser,setInfoUser]=useState({

  })


useEffect(()=>{
  setInfoUser(user)
}, [user])
  console.log(user)
  return (
    <div className="my-5 m-auto bg-light p-4" style={{ width: 450 }}>
      <h3 className="text-2xl mb-4 font-bold text-teal-600">THÔNG TIN TÀI KHOẢN</h3>
      <div className="form-outline mt-3">
        <label htmlFor="basic-url" className="form-label">
          Tên tài khoản
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            name="username"
            className="border border-teal-500 p-2 rounded w-full"
            defaultValue={user?.username}
            onChange={(evt)=>{
              setInfoUser({ ...infoUser, username: evt.target.value })
            }}
          />
        </div>
      </div>
      <div className="form-outline">
        <label htmlFor="basic-url" className="form-label">
          Họ tên
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            name="fullname"
            className="border border-teal-500 p-2 rounded w-full"
            defaultValue={user?.fullname}
            onChange={(evt) => {
              setInfoUser({ ...infoUser, fullname: evt.target.value })
            }}
          />
        </div>
      </div>

      <div className="form-outline">
        <label htmlFor="basic-url" className="form-label">
          Số điện thoại
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            name="phone"
            className="border border-teal-500 p-2 rounded w-full"
            defaultValue={user?.phone}
            onChange={(evt) => {
              setInfoUser({ ...infoUser, phone: evt.target.value })
            }}
          />
        </div>
      </div>
      <div className="form-outline">
        <label htmlFor="basic-url" className="form-label">
          Địa chỉ
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            name="address"
            className="border border-teal-500 p-2 rounded w-full"
            defaultValue={user?.address}
            onChange={(evt) => {
              setInfoUser({ ...infoUser, address: evt.target.value })
            }}
          />
        </div>
       
        {user?.type == "website" ? ( <>
          <label htmlFor="basic-url" className="form-label">
            Mật khẩu
          </label><div className="input-group mb-3">
            <input
              type="password"
              name="password"
              className="border border-teal-500 p-2 rounded w-full"
              defaultValue={""}
              onChange={(evt) => {
                setInfoUser({ ...infoUser, password: evt.target.value })
              }}
            />
          </div></>) :""}
        
        {/* <div className="my-4"><CaptchaComponent/></div> */}
        <div className="flex gap-5 mt-6">
          <button onClick={()=>{
            fetchUpdateUser({ id: user.id, body: infoUser })
          }} className="bg-teal-400 hover:bg-teal-500 flex justify-center p-2 w-full rounded text-white ">Cập nhật thông tin</button>
          {/* <button className="bg-gray-400 hover:bg-gray-500 flex justify-center p-2 w-full rounded text-white ">Thay đổi mật khẩu</button> */}
        </div>
      </div>
    </div>
  );
};
ThongTin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ThongTin;
