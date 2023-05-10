
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { actionGroupProductGets } from "../modules/group-product/action.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import validate from "../configs/validate.js";
import { actionBlogsGet, actionBlogsUpdate } from "../modules/blog/action.js";



const UpdateBlog = () => {
   const { id } = useParams();
  //initial
  const { groupBlogs } = useSelector((state) => state.groupBlogReducer);
   const { blog } = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: blog,
  });

  //handler
  function onSubmit() {
    const data = new FormData();
    Object.entries(formik.values).map((item) => {
     
        data.append(item[0], item[1]);
     
    });
    dispatch(actionBlogsUpdate({ id, data }));
  }
  console.log("groupBlogs", groupBlogs)
  useEffect(() => {
    dispatch(actionGroupProductGets());
    dispatch(actionBlogsGet({id}))

  }, []);

  return (
    <div className=" bg-slate-50 p-8 m-auto rounded" style={{ width: 720 }}>
      <p className="font-semibold text-xl text-neutral-500 mb-4 ">
        Thay đổi bài viết
      </p>

      <form
        className="w-full "
        method="POST"
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
              defaultValue={formik.values?.title}
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
              rows={5}
              pattern={validate.description}
              required="required"
              name="description"
              onChange={formik.handleChange}
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
                  uploadUrl: process.env.REACT_APP_HOST + "/blog/upload-image",
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

export default UpdateBlog;
