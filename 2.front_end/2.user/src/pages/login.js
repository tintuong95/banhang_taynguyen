import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout.js";
import { useDispatch } from "react-redux";
import { actionUserLogin } from "../store/action.js";
import Link from "next/link.js";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import useFireBase, { useToggle } from "../hooks/useFireBase.js";
import { setUser } from "../store/reducer.js";

 const providerFacebook = new FacebookAuthProvider();

 const providerGoogle = new GoogleAuthProvider();

providerFacebook.setCustomParameters({
  display: "popup",
});
providerGoogle.setCustomParameters({
  display: "popup",
});

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: null, password: null });
  const [user, authGoogleAuth, idToken] = useFireBase();
  const { push } = useRouter();
  const onSubmit = async () => {
    dispatch(actionUserLogin(form));
  };
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, idToken]);

  return (
    <div
      className=" flex justify-center items-center"
      style={{ height: 500 }}
    >
      <form
        style={{ width: 400 }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h3 className="text-2xl   mb-4 font-bold text-teal-600">
          ĐĂNG NHẬP
        </h3>
        <div className="flex flex-col">
          <label className="mb-2">Tên đăng nhập</label>
          <input
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
            type="text"
            required="required"
            className="border border-teal-500 p-2 rounded"
            style={{ width: "100% !important" }}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label className="mb-2">Mật khẩu</label>
          <input
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
            type="password"
            required="required"
            className="border border-teal-500 p-2 rounded"
            style={{ width: "100% !important" }}
          />
        </div>
        <p className="text-slate-600 my-3">
          Bạn có thể đăng ký mới !
          <Link href={"/signin"}>
            <a> Đăng ký</a>
          </Link>
        </p>
        <button type="submit" className="bg-teal-500 p-2 w-full rounded-md shadow-md text-white my-2">
          XÁC NHẬN
        </button>

        <p className="text-center my-3">Hoặc</p>
        <div className="flex gap-2  ">
          <button
            type="button"
            className="bg-rose-500 flex justify-center p-2 w-full rounded text-white gap-2"
            onClick={() => {
              authGoogleAuth(providerGoogle);
            }}
          >
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
            GOOGLE
          </button>
          <button
            type="button"
            onClick={() => {
              authGoogleAuth(providerFacebook);
            }}
            className="bg-blue-500 flex justify-center p-2 w-full rounded text-white gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="#ffffff"
            >
              <path d="M22.5 0c.83 0 1.5.67 1.5 1.5v21c0 .83-.67 1.5-1.5 1.5h-6v-9h3l.75-3.75H16.5v-1.5c0-1.5.75-2.25 2.25-2.25h1.5V3.75h-3c-2.76 0-4.5 2.16-4.5 5.25v2.25h-3V15h3v9H1.5A1.5 1.5 0 0 1 0 22.5v-21C0 .67.67 0 1.5 0h21z" />
            </svg>
            FACEBOOK
          </button>
        </div>
      </form>
    </div>
  );
};

Login.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Login;
