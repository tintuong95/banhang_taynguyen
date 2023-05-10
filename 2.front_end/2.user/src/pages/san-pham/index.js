import React, { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../../components/Layout/Layout.js";
import CardProduct from "../../components/common/CartProduct.js";
import { useRouter } from "next/router.js";
import ListPosts from "../../components/common/ListPosts.js";
import { useDispatch, useSelector } from "react-redux";
import { actionProductList, actionProductListAdd } from "../../store/action.js";
import banner_one  from "../../assets/images/banner_one.png"
import BreadCrumb from "../../components/common/BreadCrumb.js";


const Products = () => {
  const { query } = useRouter();
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.reducerStore)
  const [sort, setSort] = useState("&updatedAt=DESC")
  const [queryProduct, setQueryProduct] = useState({
    limit: 16,
    offset: 16,
  });
  const paramsHandler = (limit, offset, id, sort) => {
    let params = "/product?limit=" + limit + "&offset=" + offset + sort

    if (id) {
      params += "&idGroupProduct=" + id
    }
    return params
  }


  const convertSort = (value) => {
    switch (value) {
      case "moi-nhat": {
        setSort("&updatedAt=DESC")
        break;
      }
      case "cu-nhat": {
        setSort("&updatedAt=ASC")
        break;
      }
      case "gia-tang": {
        setSort("&price=ASC")
        break;
      }
      case "gia-giam": {
        setSort("&price=DESC")
        break;
      }
    }
  }


  useEffect(() => {

    dispatch(actionProductList({ url: paramsHandler(16, 0, query.id, sort) }))
  }, [sort])

  return (
    <>
      <div className="w-4/5 m-auto">
        <Image src={banner_one}  width={1520} height={250} className="rounded "/>
    </div>
      <div className="w-4/5 m-auto mt-5 ">
        <BreadCrumb data={["Trang chủ", ">", "Sản phẩm", `${query.name ? ">" : ""}`, query.name]} />
      </div>

      <div className="  px-0 mt-4">
        <div className="row ">
          <div className="col-9 row">
            <div className="  w-4/5 m-auto">
              <select
                defaultValue={""}
                className="bg-slate-100  p-2 mx-3 rounded"
                onChange={(evt) => {
                  convertSort(evt.target.value);
                }}
              >
                <option value="">Sắp xếp theo</option>
                <option value="moi-nhat">Mới nhất</option>
                <option value="cu-nhat">Cũ nhất</option>
                <option value="gia-tang">Giá tăng dần</option>
                <option value="gia-giam">Giá giảm dần</option>
              </select>
            </div>
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1  w-4/5 m-auto">

              {products?.map((item) => (
                <div key={item.id}>
                  <CardProduct {...item} />
                </div>
              ))}
            </div>
            <div className="row mt-4">
              <div className="flex justify-center mb-4 p-3 gap-11 items-center">
                <hr className="2xl:w-64 lg:w-32 sm:w-16 max-sm:w-8" />
                <button onClick={() => {

                  dispatch(actionProductListAdd({ url: paramsHandler(8, queryProduct.offset + 8, query.id, sort) }))
                  setQueryProduct({ ...queryProduct, offset: queryProduct.offset + 8 })
                }} className="bg-teal-500 p-2 px-3 rounded-md text-white border">Xem thêm</button>
                <hr className="2xl:w-64 lg:w-32 sm:w-16 max-sm:w-8" />
               
              </div>
            </div>
          </div>
          <div className="">
            <ListPosts />
          </div>
        </div>
      </div>
    </>
  );
};

Products.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Products;
