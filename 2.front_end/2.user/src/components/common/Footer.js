import React, { PureComponent } from "react";
import Image from "next/image";
import useSWR from "swr";
import { axiosClient } from "../../configs/axios";
import Link from "next/link";
import Chatbox from "./Chatbox";
import { useSelector } from "react-redux";

const fetcher = (URL) => {
  return axiosClient({
    method: "GET",
    url: URL,
  });
};

function Footer() {
  const { loading } = useSelector(state => state.reducerStore)
  return (
    <div className="mt-10 border-t pt-10 text-slate-600 relative">
      <div className="w-4/5 m-auto grid md:grid-cols-10 ">
        <div className="md:col-span-4 sm:col-span-10    md:px-6 sm:px-0 ">
          <div className="ms-4 pb-4 sm:text-start md:text-center">
            <Image
              src={require("../../assets/images/logo_tnf.png")}
              alt="logo"
              className="footer-logo p-h5 m-0 "
              width={380}
              height={80}
            />
          </div>

          <ul className="ms-4 ">
            <li className="flex items-center md:justify-center sm:justify-start my-2 ">
              <Image
                src={require("../../assets/images/iconphone.png")}
                width={25}
                height={25}
                alt={"icon cart"}
              />
              &nbsp; &nbsp;
              <span>0939.999.888</span>
            </li>
            <li className="flex items-center md:justify-center sm:justify-start my-2">
              <span>
                <Image
                  src={require("../../assets/images/iconmail.png")}
                  width={25}
                  height={25}
                  alt={"icon cart"}
                />
              </span>
              &nbsp; &nbsp;
              <span>admin@taynguyenfood.com</span>
            </li>
            <li className="flex items-center md:justify-center  sm:justify-start  my-2">
              <span>
                <Image
                  src={require("../../assets/images/iconaddress.png")}
                  width={25}
                  height={25}
                  alt={"icon cart"}
                />
              </span>
              &nbsp; &nbsp;
              <span className="w-75">
                Phường Phú La, Quận Hà Đông, Thành phố Hà Nội
              </span>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 sm:col-span-10  flex md:justify-end sm:mt-5">
          <div className="">
            <h3 className="text-teal-500 inline-block border-b-2 border-b-teal-500 font-semibold text-lg ">
              CHÍNH SÁCH 
            </h3>
            <ul className="mt-4 list-disc  flex flex-col gap-2 pl-3" >
              <li className="hover:underline">
                Chính sách bảo quản, đóng gói
              </li>
              <li className="hover:underline">
                Chính sách nguồn sản phẩm
              </li>
              <li className="hover:underline">
                Chính sách và điều khoản
              </li>
              <li className="hover:underline">
                Câu hỏi thường gặp
              </li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-2 sm:col-span-10  flex md:justify-end sm:mt-5">
          <div>
            <h3 className="text-teal-500 inline-block border-b-2 border-b-teal-500 font-semibold text-lg ">
              HỖ TRỢ
            </h3>
            <ul className="mt-4 list-disc  flex flex-col gap-2 pl-3" >
              <li className="hover:underline">
                <i className="fa-brands fa-facebook-f"></i>Vận chuyển
              </li>
              <li className="hover:underline">
                <i className="fa fa-instagram" aria-hidden="true"></i>
                Thanh toán
              </li>
              <li className="hover:underline">
                <i className="fa fa-instagram" aria-hidden="true"></i>
                Đổi trả
              </li>
              <li className="hover:underline">
                <i className="fa fa-instagram" aria-hidden="true"></i>
                Khuyến mại
              </li>
            </ul>
          </div>




        </div>
        <div className="md:col-span-2 sm:col-span-10  flex md:justify-end sm:mt-5">
          <div className=" ">



            <h3 className="text-teal-500 inline-block border-b-2 border-b-teal-500 font-semibold text-lg ">
              HỖ TRỢ
            </h3>

            <ul className="flex flex-col  mt-4 gap-3">
              <li className="flex   items-center gap-3">
                <Image width={25} height={25} src={require("../../assets/images/fb_icon.png")} />
                Facebook
              </li>

              <li className="flex t  items-center gap-3">
                <Image width={25} height={25} src={require("../../assets/images/google_icon.png")} />
                Youtube
              </li>
            </ul>
          </div>
        </div>
      

      </div>
      <div className="bg-slate-300 text-center p-2 mt-5">Copyright @2022 taynguyenfood.com</div>
      {!loading ? <Chatbox /> : null}
    </div>
  );
}

export default Footer;
