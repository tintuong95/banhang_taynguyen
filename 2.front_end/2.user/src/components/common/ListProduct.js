import Image from "next/image.js";
import Link from "next/link.js";
import React, { useEffect, useState } from "react";

import useSWR from "swr";
import { axiosClient } from "../../configs/axios.js";

import CardProduct from "./CartProduct.js";

const fetcher = (URL) => {
  return axiosClient({
    method: "GET",
    url: URL,
  });
};

const ListProduct = ({ id, name,param }) => {
  const { data: Products } = useSWR(
    "/product?limit=12&offset=0&idGroupProduct=" + id,
    fetcher
  );

  const {data:count}=useSWR("/product/count/"+id,fetcher)

  return (
    <div className=" mb-10 ">
      <div className="flex justify-between w-4/5 m-auto ">
        <div className="">
          <div className="flex items-center gap-3 font-bold text-teal-600">
            <Image
              src={require("../../assets/images/category.png")}
              width={30}
              height={30}
              alt={"icon category"}
            />
            {name.toUpperCase()}
            <span className="text-sm font-thin max-sm:hidden bg-teal-100 p-1 rounded-lg">{count?.data} sản phẩm</span>
          </div>
        </div>
        <div className="flex items-center  ">
          <Link
            href={{
              pathname: "/san-pham",
              query: { id, name },
            }}
          >
            <a className="underline mr-3">Xem thêm</a>
          </Link>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-4   lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 w-4/5 m-auto">
        {Products?.data?.map((item) => (
          <CardProduct key={item.id} {...item} paramGroup={param} />
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
