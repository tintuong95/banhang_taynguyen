import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import Image from "next/image";
import CardPost from "../../components/common/CardPost.js";
import CardPostSmall from "../../components/common/CardPostSmall.js";
import useSWR from "swr";
import { axiosClient } from "../../configs/axios.js";
import ListPosts from "../../components/common/ListPosts.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionNewsList, actionNewsListAdd } from "../../store/action.js";

 const fetcher = (URL) => {
   return axiosClient({
     method: "GET",
     url: URL,
   });
 };
const Blogs = () => {
  const dispatch =useDispatch()
  const {blogs } = useSelector(state => state.reducerStore)
   const [queryBlog, setQueryBlog] = useState({
    limit: 12,
    offset:12,
  });


  const { data: suggestionsBlogs } = useSWR("/blog?limit=5&offset=10", fetcher);
  useEffect(()=>{
    dispatch(actionNewsList({limit:12,offset:0}))
  },[])
  return (
    <>
    

      <div className=" m-auto 2xl:w-2/3 lg:w-4/5 sm:w-5/6" >
  
          <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 max-sm:col-span-3 max-sm:w-3/4 max-sm:m-auto">
              <h3 className="mb-3 text-lg font-semibold text-teal-600">
                MỚI NHẤT
              </h3>
              <ul className="flex flex-col gap-5">
                {blogs?.map((item) => <CardPost key={item.id} {...item} />)}
              </ul>
              <div className="row mb-4 ">
                <div className="col-12 text-center">
                  <button
                    className="border-teal-500 p-2 w-full rounded-md border border-dashed mt-5"
                    onClick={() => {
                      dispatch(actionNewsListAdd({ limit: 6, offset:queryBlog.offset+6}))
                      
                      setQueryBlog({
                        ...queryBlog,
                        offset: queryBlog.offset + 6,
                      });
                    }}
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 max-sm:hidden">
              <h3 className="mb-3 text-lg font-semibold text-teal-600 ">
                KHUYẾN MẠI
              </h3>
              <Image src={require("../../assets/images/ads.png")} />
              <div>
                <div className="mt-4">
                  <h3 className="mb-3 text-lg font-semibold text-teal-600  ">GỢI Ý</h3>
                  <ul className="flex flex-col gap-5  ">
                    {suggestionsBlogs?.data?.map((item) => {
                      return <CardPostSmall key={item.id} {...item} />;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

      </div>
      <ListPosts />
    </>
  );
};

Blogs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Blogs;
