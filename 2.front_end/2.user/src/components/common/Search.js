import Image from "next/image.js";
import Link from "next/link.js";
import React, { useState } from "react";
import useSWR from "swr";
import {useDebouncedCallback} from "use-debounce";
import { axiosClient } from "../../configs/axios.js";
import ItemSearch from "./ItemSearch.js";

const Search = () => {
 
  const fetcher = (URL) => {
    return axiosClient({
      method: "GET",
      url: URL,
    });
  };
  const [search, setSearch] = useState(null);
 const debounce=useDebouncedCallback((value) => {
      setSearch(value);
    },1000)
    
  const { data: Products } = useSWR(
    "/product?limit=10&offset=0&search=" + search,
    fetcher
  );
 
  return (
    <div className=" ">
      <div className=" bg-teal-500 dropdown p-2 px-5 rounded-md border-teal-500  text-white">
        <div >
          <Link
            href={{
              pathname: "/san-pham",
            }}
          >
            <a className="flex items-center gap-2 " type="button">
              <Image
                src={require("../../assets/images/product.png")}
                width={25}
                height={25}
                alt={"icon cart"}
              />
              Tìm kiếm
            </a>
          </Link>
         
        </div>
      </div>
   
       

     
      <div className="view-search w-full">
        {search
          ? Products?.data.map((item) => <ItemSearch {...item} key={item.id} />)
          : ""}
      </div>
    </div>
  );
};

export default Search;
