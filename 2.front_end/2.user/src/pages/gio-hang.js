import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout.js";
import Image from "next/image";
import ItemCart from "../components/common/ItemCart.js";
import { useDispatch, useSelector } from "react-redux";
import { actionCartGets, actionProductListAmount } from "../store/action.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import { axiosClient } from "../configs/axios.js";
import CartProduct from "../components/common/CartProduct.js";

const fetcher = (URL) => {
  return axiosClient({
    method: "GET",
    url: URL,
  });
};

const Cart = () => {
  const dispatch = useDispatch();

  const { user, carts,amounts } = useSelector((state) => state.reducerStore);
  
  const { data: products } = useSWR(
    "/product?limit=9&offset=0" 
     ,
    fetcher
  );
  const handleSummary = () => {
    let summary = 0;
    carts?.forEach((item) => {
      summary += item.quantity * Number(item.ProductCartItem?.price);
    });
    return summary;
  };

  useEffect(() => {
    if (user != null) {
      dispatch(actionCartGets({ id: user.id }));
      
    } 
  }, [user]);

  useEffect(() => {
    dispatch(actionProductListAmount({list:carts.map(item=>item.idProduct)}))
  }, [carts]);

  return (
    <>
      {carts?.length == 0 ? (
        <div className="flex justify-center items-center" style={{ minHeight: 500 }}>
          <Image alt="banner-empty" src={require("../assets/images/empty.png")} width={400} height={200} />
        </div>
      ) : (
        <div className="xl:w-3/5 lg:w-4/5 md:w-4/5 sm:w-5/6  max-sm:w-5/6 m-auto ">

           <div className="">
            <div className=" ">
              <div className="">
                <div className=" bg-slate-50 p-4">
                  <h3 className="my-0">GIỎ HÀNG</h3>
                </div>
                {carts?.map((item) => (
                  <ItemCart  {...item} key={item.id}  amounts={amounts}/>
                ))}

                  <div className=" border-gray-100 flex  justify-end items-center gap-4 border py-5 ">
                  <div className="">Tiền hàng</div>
                    <div className="font-bold text-2xl text-teal-400 flex justify-end mr-4 ">
                    {handleSummary().toLocaleString("vi-VN")} đ
                  </div>
                
               
                </div>
                <div className="flex justify-end mt-5 gap-4 ">
                    <Link href={"/"}>
                      <a className="bg-gray-300 shadow text-white p-4 rounded font-medium">TRỞ LẠI</a>
                    </Link>
                  <Link href={"/thanh-toan"}>
                      <a className="bg-teal-400 shadow text-white p-4 rounded font-medium">ĐẶT HÀNG</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
            <div className="" >
              <h3 className="text-lg  ml-2 mb-4 font-bold text-teal-600">GỢI Ý</h3>
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2  ">
                {products?.data?.map((item, index) => <div key={index}>
                  <CartProduct {...item} />
                </div>)}
                  </div>
          </div>
         </div>

      )}
    </>
  );
};

Cart.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Cart;
