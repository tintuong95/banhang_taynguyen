import React, { useEffect, useState } from "react";

import Image from "next/image";
// import required modules
import Layout from "../../components/Layout/Layout.js";
import ThumbsGallery from "../../components/common/ThumbsGallery.js";
import CardPostSmall from "../../components/common/CardPostSmall.js";
import CommentItem from "../../components/common/CommentItem.js";
import ReProduct from "../../components/common/ReProduct.js";
import { useRouter } from "next/router.js";
import { axiosClient, axiosServer } from "../../configs/axios.js";
import useSWR from "swr";
import BreadCrumb from "../../components/common/BreadCrumb.js";
import { useDispatch, useSelector } from "react-redux";
import {
  actionCartItemCreate,
  actionCartItemUpdate,
  actionCommentProductCreate,
  actionCommentProductGet,
  actionProductView,
} from "../../store/action.js";
import Rating from "../../components/common/Rating.js";
import ListPosts from "../../components/common/ListPosts.js";
import Head from "next/head.js";

const Product = ({ product, suggests }) => {
  const [comment, setComment] = useState(4);
  const [form, setForm] = useState(null);
  const { user, commentProducts, carts } = useSelector(
    (state) => state.reducerStore
  );

  const dispatch = useDispatch();
  const { push } = useRouter();

  //check cart item exists in cart if it exists update quantity or create cart item new
  const onAddCart = () => {
    let flag = true;
    let cartItem = null;
    carts.forEach((item) => {
      if (product.id == item.idProduct) {
        flag = false;
        cartItem = item;
      }
    });

    if (!user) {
      return push("/login");
    }

    if (flag) {
      dispatch(
        actionCartItemCreate({
          idUser: user?.id,
          idProduct: product.id,
          quantity: 1,
        })
      );
    } else {
      dispatch(
        actionCartItemUpdate({
          id: cartItem.id,
          quantity: cartItem.quantity + 1,
          idUser: cartItem.idUser,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(actionCommentProductGet({ idProduct: product.id }));
    dispatch(actionProductView({ idProduct: product.id }));
  }, []);
  console.log(product)
  return (
    <>
      <Head>
        <meta name="keywords" content={product?.title} />
        <meta name="description" content={product?.description} />
        <meta property="og:url" itemprop="url" content={"/https://taynguyenfood.com/san-pham/"+product?.param} />
        <meta property="og:title" content={product?.title} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={product?.image} />
        <link rel="canonical" href={"/https://taynguyenfood.com/san-pham/" + product?.param} />
      </Head>
      <div className="2xl:w-3/6 lg:w-4/6 md:w-5/6 sm:w-5/6 m-auto pt-5 max-sm:p-4">
        <div className="">
          <BreadCrumb data={["Trang chủ", ">", "Sản phẩm", ">", product.title]} />
        </div>
        <div className="grid grid-cols-5 gap-10 mt-6">

          <div className="col-span-2 md:col-span-2 md:mx-0 sm:col-span-5  max-sm:col-span-5 max-sm:p-4 " >
            <div className="product-info">
              <h2 className="text-xl text-teal-700 font-semibold">
                {product?.title.toUpperCase()}
              </h2>
              <div className="flex flex-col gap-2 mt-3">
                <label className="flex items-center">
                  <span> Giá bán :</span>
                  <h2 className=" px-3 rounded text-teal-500 font-medium text-xl  ml-3 ">
                    {product.price.toLocaleString("vi-VN")} đ
                  </h2>
                </label>
                <label className="flex items-center">
                  <span> Giá cũ :</span>
                  <span
                    className="bg-slate-100 px-3 ml-2 text-slate-600  rounded"
                    style={{ textDecoration: "line-through" }}
                  >
                    {(
                      (product.price * product.sale) / 100 +
                      product.price
                    ).toLocaleString("vi-VN")}
                    đ
                  </span>
                </label>

                <label className="flex items-center">
                  Số lượng : {product.amount}
                </label>
                <label className="flex items-center">
                  Đơn vị : {product.unit}
                </label>
              </div>
              <button
                onClick={onAddCart}
                className="bg-teal-600 w-full p-2 text-white rounded-md shadow mt-4 hover:bg-teal-500"
                disabled={product.amount < 1}
              >
                Thêm vào giỏ
              </button>
            </div>
            <div className="mt-4"> 
              

              <Rating
                idUser={user?.id}
                idProduct={product.id}
                rates={product.ProductRatings}
              />
            </div>
            <div className="product-commit w-100 mt-4 rounded-2">
              <ul className="flex flex-col">
                <li className="flex items-center my-2">
                  <Image
                    src={require("../../assets/images/iconsuccess.png")}
                    width={25}
                    height={25}
                    alt={"icon success"}
                  />

                  <p className="my-0 mx-2">Kiểm định rõ ràng</p>
                </li>
                <li className="flex items-center my-2">
                  <Image
                    src={require("../../assets/images/iconsuccess.png")}
                    width={25}
                    height={25}
                    alt={"icon success"}
                  />
                  <p className="my-0 mx-2">Hàng tươi, chất lượng</p>
                </li>
                <li className="flex items-center my-2">
                  <Image
                    src={require("../../assets/images/iconsuccess.png")}
                    width={25}
                    height={25}
                    alt={"icon success"}
                  />

                  <p className="my-0 mx-2">Chuyển phát nhanh</p>
                </li>
                <li className="flex items-center my-2">
                  <Image
                    src={require("../../assets/images/iconsuccess.png")}
                    width={25}
                    height={25}
                    alt={"icon success"}
                  />

                  <p className="my-0 mx-2"> Hoàn trả đơn giản</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-2 md:col-span-3 md:mx-0  sm:col-span-5 sm:mx-10 max-sm:col-span-5 max-sm:mx-10  border  rounded-md p-4 ">
            <ThumbsGallery data={product.ProductImage} />
          </div>

        </div>
      </div>
      <div className="2xl:w-3/6 lg:w-4/6 md:w-5/6 sm:w-5/6 m-auto pt-5 ">
        <div className="2xl:w-2/3 lg:w-4/6 md:w-4/6 sm:w-full max-sm:wfull   max-sm:p-5">
          <div className="col-span-2 ">
            <div className="col-7">
              <div className="product-description ">
                <h3 className="mb-3 text-lg font-semibold text-teal-600">
                  THÔNG TIN SẢN PHẨM
                </h3>
                <div
                  className="mr-4"
                  dangerouslySetInnerHTML={{ __html: product?.detail }}
                ></div>
              </div>
              
              <div>
                <h3 className="mb-3 text-lg  font-semibold text-teal-600 mt-7">
                  NHẬN XÉT
                </h3>
                <div className="cus-comments">
                  <div className="row mt-4">
                    <div className="col-12">
                      <textarea
                        className="border p-2   border-dashed border-teal-500 rounded-md w-full focus:outline-none"
                        id="comment"
                        name="comment"
                        rows="5"
                        cols="50"
                        placeholder="Bình luận"
                        onChange={(e) => {
                          setForm(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="flex justify-end">
                      <button
                        className=" p-2 w-full  justify-center px-4 rounded  border-teal-500 border-dashed  border flex items-center gap-3"
                        onClick={() => {
                          if (!user) {
                            push("/login");
                            return
                          }
                          dispatch(
                            actionCommentProductCreate({
                              content: form,
                              idUser: user?.id,
                              idProduct: product.id,
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
              <div className="">
                {commentProducts?.map((item, index) => {
                  if (index < comment) {
                    return (
                      <CommentItem
                        key={item.id}
                        username={item.UserCommentProduct?.username || 'Ẩn danh'}
                        content={item.content}
                      />
                    );
                  }
                })}
                {commentProducts.length == 0 ? null : (<div className=" flex justify-end">
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
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className=" " style={{ paddingLeft: 40 }}>
          <ListPosts />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  const product = await axiosServer({
    method: "GET",
    url: "/product/param/" + params.param,
  });
  const suggests = await axiosServer({
    method: "GET",
    url: "/blog?limit=4&offset=0",
  });
  return {
    props: { product: product.data, suggests: suggests.data },
  };
}

export async function getStaticPaths() {
  const response = await axiosServer({
    method: "GET",
    url: "/product?limit=10000&offset=0",
  });
  let paths = response.data.map((item) => ({ params: { param: item.param } }));
  return {
    paths: paths, //
    fallback: false, // can also be true or 'blocking'
  };
}

Product.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Product;
