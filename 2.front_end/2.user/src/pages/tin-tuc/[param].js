import React, { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout.js";
import Image from "next/image";
import CardPost from "../../components/common/CardPost.js";
import CardPostSmall from "../../components/common/CardPostSmall.js";
import CommentItem from "../../components/common/CommentItem.js";
import { axiosClient, axiosServer } from "../../configs/axios.js";
import BreadCrumb from "../../components/common/BreadCrumb.js";
import { useDispatch, useSelector } from "react-redux";
import {
  actionBlogView,
  actionCommentBlogCreate,
  actionCommentBlogGet,
} from "../../store/action.js";
import { useRouter } from "next/router.js";
import Head from "next/head.js";

const Blogs = ({ blog, suggest }) => {
  const [comment, setComment] = useState(4);
  const [form, setForm] = useState(null);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { user, commentBlogs } = useSelector((state) => state.reducerStore);
  useEffect(() => {
    dispatch(actionCommentBlogGet({ idBlog: blog.id }));
  }, []);

  return (
    <>
    <Head>
        <meta name="keywords" content={blog?.title} />
        <meta name="description" content={blog?.description} />
        <meta property="og:url" itemprop="url" content={"/https://taynguyenfood.com/san-pham/" + blog?.param} />
        <meta property="og:title" content={blog?.title} />
        <meta property="og:description" content={blog?.description} />
        <meta property="og:image" content={blog?.image} />
        <link rel="canonical" href={"/https://taynguyenfood.com/san-pham/" + blog?.param} />
    </Head>
      <div className="">
        <div className="2xl:w-1/2 lg:w-2/3 md:w-4/5 sm:w-full max-sm:w-full max-sm:p-5 sm:p-5  grid grid-cols-3  gap-5 m-auto  ">
          <div className="2xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-3 max-sm:col-span-3">
            <BreadCrumb data={["Trang chủ", ">", "Tin Tức", ">", blog.title]} />
            <h2 className="text-xl text-teal-800 font-semibold my-3 ">{blog?.title.toUpperCase()}</h2>
            <p className="flex gap-2 my-3 ">
              <small className="p-1 px-2 text-slate-500 rounded border border-teal-500 border-dashed">{blog?.GroupBlogBlog?.name}</small>
              <small className="= p-1 px-2 text-slate-500 rounded border border-teal-500 border-dashed">
                {new Date(blog?.updatedAt).toLocaleDateString("vi-VN")}
              </small>
              <div className="= p-1 px-2 text-slate-500 rounded flex  gap-2 items-center border border-teal-500 border-dashed">
                <small ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></small>
                <small>{blog?.view}</small>
             </div>
            </p>
            <p className="my-3 bg-teal-50 p-3">
              <span>{blog?.description}</span>
            </p>
            <div
              className="mr-4"
              dangerouslySetInnerHTML={{ __html: blog?.detail }}
            ></div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-teal-600">NHẬN XÉT</h3>
              <div className="cus-comments">  
                <div className="row mt-4">
                  <div className="col-12">
                    <textarea
                      className="border p-2   border-dashed border-teal-500 rounded-md w-full focus:outline-none"
                      id="comment"
                      name="comment"
                      rows="3"
                      cols="50"
                      placeholder="Bình luận"
                      onChange={(e) => {
                        setForm(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className=" mt-2">
                  <div className=" text-end">
                    <button
                      className=" p-2 w-full  justify-center px-4 rounded  border-teal-500 border-dashed  border flex items-center gap-3"
                      onClick={() => {
                        if (!user) {
                         return push("/login");
                        }
                        dispatch(
                          actionCommentBlogCreate({
                            content: form,
                            idUser: user?.id,
                            idBlog: blog?.id,
                          })
                        );
                      }}
                     
                    
                    >
                      Nhận xét
                      <Image width={25} height={25} src={require("../../assets/images/icon_add.png")} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-5 mb-2">
              {commentBlogs?.map((item, index) => {
                if (index < comment) {
                  return (
                    <CommentItem
                      key={item.id}
                      username={item.UserCommentBlog?.username}
                      content={item.content}
                    />
                  );
                }
              })}
            </div>
            {commentBlogs.length == 0 ? null : (<div className="text-end mb-5">
              <button
                className="underline"

                onClick={() => {
                  setComment(comment + 4);
                }}
              >
                Xem thêm
              </button>
            </div>)}
          </div>
          <div className="2xl:block lg:block md:block sm:hidden max-sm:hidden">
            <h3 className="mb-3 text-lg font-semibold text-teal-600">GỢI Ý</h3>
            <ul className="flex flex-col gap-3  ">
              {suggest?.map((item) => {
                return <CardPostSmall key={item.id} {...item} />;
              })}
            </ul>
          </div>
        </div>
      </div>

    </>
  );
};

export async function getStaticProps({ params }) {
  const response = await axiosServer({
    method: "GET",
    url: "/blog/param/" + params.param,
  });
  const suggestion = await axiosServer({
    method: "GET",
    url: "/blog?limit=4&offset=0",
  });

  return {
    props: { blog: response.data, suggest: suggestion.data },
  };
}

export async function getStaticPaths() {
  const response = await axiosServer({
    method: "GET",
    url: "/blog?limit=10000&offset=0",
  });
  let paths = response.data.map((item) => ({ params: { param: item.param } }));
  return {
    paths: paths, //
    fallback: false, // can also be true or 'blocking'
  };
}

Blogs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Blogs;
