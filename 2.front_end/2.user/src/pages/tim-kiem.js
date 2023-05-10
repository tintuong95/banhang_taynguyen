import Layout from "../components/Layout/Layout.js";
import Categories from "../components/common/Categories.js";
import Carousel from "../components/common/Carousel.js";

import CartProduct from "../components/common/CartProduct";
import useSWR from "swr";
import { axiosClient } from "../configs/axios.js";
import Image from "next/image.js";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionProductListSearch } from "../store/action.js";



export default function Home() {


  const [search, setSearch] = useState(null);
  const { searchList } = useSelector(state => state.reducerStore)
  const  dispatch =useDispatch()
  const debounce = useDebouncedCallback((value) => {
    setSearch(value);
  }, 1000)
  const handleQuery = () => {
    if (search) {
      return "/product?limit=12&offset=0&search=" + search
    } else {
      return "/product?limit=12&offset="
    }
  }
  useEffect(()=>{
    dispatch(actionProductListSearch({ url: handleQuery() }))
  }, [search])


  

  return (
    <>
    
      <div className=" flex justify-center pt-5 mt-8">
     
        <input
          className="border p-2 lg:w-1/3 md:w-4/5 sm:w-4/5 max-sm:w-4/5 shadow-lg text-center h-16  rounded-full focus:outline-none"
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          onChange={(e) => {
            debounce(e.target.value);
          }}
        />
      </div>

      <div >
        <h3 className="text-xl mb-4 mt-5 px-3 font-bold text-teal-600 w-4/5 m-auto">
          {search ? "KẾT QUẢ TÌM KIẾM" : "GỢI Ý"}
        </h3>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 w-4/5 m-auto">

          {searchList?.map((item) => (
            <CartProduct key={item.id} {...item} />
          ))}
        </div>
   s

      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
