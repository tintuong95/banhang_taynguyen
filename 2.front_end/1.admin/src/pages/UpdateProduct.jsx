import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, Formik } from "formik";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { actionGroupProductGets } from "../modules/group-product/action.js";

import { useLocation, useParams } from "react-router-dom";
// import uploadPlugin from "../utils/uploadAdapter.js";
import {
  actionProductGet,
  actionProductUpdate,
} from "../modules/product/action.js";
import validate from "../configs/validate.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { actionGroupBlogGets } from "../modules/group-blog/action.js";

const { Option } = Select;

const UpdateProduct = () => {
  const { id } = useParams();

  //initial
  const { groupProducts } = useSelector((state) => state.groupProductReducer);
  const { product } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: product,
  });

  //handler

  function onSubmit() {
    const data = new FormData();
    Object.entries(formik.values).map((item) => {
      if (item[0] == "images") {
        Object.entries(item[1]).forEach((val) => {
          data.append(item[0], val[1]);
        });
      } else {
        data.append(item[0], item[1]);
      }
    });
  
    dispatch(actionProductUpdate({ id, data }));
  }
  useEffect(()=>{
    dispatch(actionGroupProductGets());
  },[])
  useEffect(() => {
   
    dispatch(actionProductGet({ id }));
  }, [id]);

  console.log("product", groupProducts);
  return (
    <div className=" bg-slate-50 p-8 m-auto rounded" style={{ width: 720 }}>
      <p className="font-semibold text-xl text-neutral-500 mb-4 ">
        Thay đổi sản phẩm
      </p>

      <form
        className="w-full "
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-2 m">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Tiêu đề
            </label>
            <input
              name="title"
              onChange={formik.handleChange}
              defaultValue={formik.values.title}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            />
          </div>
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Loại sản phẩm
            </label>

            <select
              name="idGroupProduct"
              onChange={formik.handleChange}
              value={formik.values?.idGroupProduct}
              className=" appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            >
              <option value="">Vui lòng chọn</option>
              {groupProducts.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full px-3 mb-2 flex gap-2 ">
            <div className="w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                GIÁ BÁN
              </label>
              <input
                name="price"
                onChange={formik.handleChange}
                defaultValue={formik.values?.price}
                // pattern={validate.price}
                required="required"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
              />
            </div>
            <div className="w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                SỐ LƯỢNG
              </label>
              <input
                name="amount"
                onChange={formik.handleChange}
                defaultValue={formik.values?.amount}
                // pattern={validate.price}
                required="required"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
              />
            </div>
          </div>
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              GIẢM GIÁ
            </label>
            <input
              name="sale"
              onChange={formik.handleChange}
              defaultValue={formik.values?.sale}
              // pattern={validate.price}
              required="required"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            />
          </div>
          <div className="w-full px-3 mb-2 flex gap-2 ">
            <div className="w-1/4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Chiều cao (cm)
              </label>
              <input
                name="height"
                onChange={formik.handleChange}
                defaultValue={formik.values?.height}
                // pattern={validate.price}
                required="required"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
              />
            </div>
            <div className="w-1/4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Chiều dài (cm)
              </label>
              <input
                name="length"
                onChange={formik.handleChange}
                defaultValue={formik.values?.length}
                // pattern={validate.price}
                required="required"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
              />
            </div>
            <div className="w-1/4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Chiều rộng (cm)
              </label>
              <input
                name="width"
                onChange={formik.handleChange}
                defaultValue={formik.values?.width}
                // pattern={validate.price}
                required="required"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
              />
            </div>
            <div className="w-1/4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cân nặng (gram)
              </label>
              <input
                name="weight"
                onChange={formik.handleChange}
                defaultValue={formik.values?.weight}
                // pattern={validate.price}
                required="required"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
              />
            </div>
          </div>

          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              ĐƠN VỊ
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
              value={formik.values?.unit}
              name="unit"
              onChange={formik.handleChange}
              required="required"
            >
              <option value="gram">Gram</option>
              <option value="hop">Hộp</option>
              <option value="cai">Cái</option>
              <option value="con">Con</option>
            </select>
          </div>
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              ẢNH ĐẠI DIỆN
            </label>
            <input
              type="file"
              onChange={(e) => {
                formik.setFieldValue("image", e.target.files[0]);
              }}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            />
          </div>
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              ALBUM ẢNH
            </label>
            <input
              name="images"
              onChange={(e) => {
                formik.setFieldValue("images", e.target.files);
              }}
              type="file"
              multiple
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            />
          </div>
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              MÔ TẢ NGẮN GỌN
            </label>
            <textarea
            rows={5}
              name="description"
              onChange={formik.handleChange}
              pattern={validate.title}
              required="required"
              defaultValue={formik.values.description}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            />
          </div>
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              NỘI DUNG
            </label>
            <CKEditor
              editor={Editor}
              data={formik.values.detail}
              onChange={(event, editor) => {
                formik.setFieldValue("detail", editor.getData());
              }}
              config={{
                ckfinder: {
                  uploadUrl:
                    process.env.REACT_APP_HOST + "/product/upload-image",
                  withCredentials: true,
                },
              }}
            />
          </div>
          <div className="w-full px-3 mb-2 ">
            <button
              type="submit"
              className="text-white mt-3 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              XÁC NHẬN
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
