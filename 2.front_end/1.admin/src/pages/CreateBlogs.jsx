import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { actionBlogsPost } from "../modules/blog/action.js";
import { actionGroupBlogGets } from "../modules/group-blog/action.js";
import validate from "../configs/validate.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
const { Option } = Select;

const CreateBlogs = () => {
  //initial

  const { groupBlogs } = useSelector((state) => state.groupBlogReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {},
  });


  const onFinish = () => {
   const data = new FormData();
   Object.entries(formik.values).map((item) => {
     data.append(item[0], item[1]);
   });
   dispatch(actionBlogsPost(data));
  };

  useEffect(() => {
    dispatch(actionGroupBlogGets());
  }, []);

  return (
    <div className=" m-auto bg-slate-50 p-8" style={{width:720}}>
      <p className="font-semibold text-lg text-neutral-500 mb-4 ">
        Tạo mới tin tức
      </p>
     
      <form
        className="w-full "
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          onFinish();
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
           
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            />
          </div>
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Thể loại
            </label>

            <select
              value={formik.values?.idGroupBlog}
              name="idGroupBlog"
              onChange={formik.handleChange}
              className=" appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            >
              <option value="">Vui lòng chọn</option>
              {groupBlogs.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              ẢNH ĐẠI DIỆN
            </label>
            <input
              type="file"
              required="required"
              name="image"
              onChange={(e) => {
                formik.setFieldValue("image", e.target.files[0]);
              }}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
            />
          </div>
        
          <div className="w-full px-3 mb-2 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              MÔ TẢ NGẮN GỌN
            </label>
            <textarea
              pattern={validate.description}
              required="required"
              name="description"
              onChange={formik.handleChange}
              rows={5}
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
                    process.env.REACT_APP_HOST + "/blog/upload-image",
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

export default CreateBlogs;
