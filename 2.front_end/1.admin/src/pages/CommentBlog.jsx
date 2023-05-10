import { Button,  Modal,  Table, Tag } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams} from "react-router-dom";
import { actionCommentBlogGets, actionCommentBlogRemove } from "../modules/comment-blog/action.js";

import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const CommentBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { commentBlogs } = useSelector((state) => state.commentBlogReducer);

  //modal delete binh luan
  const confirm = (id, idBlog) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn bình luận này !",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        dispatch(actionCommentBlogRemove({ id, idBlog }));
      },
    });
  };

  const columns = [
    {
      title: "#",

      render: (text, record, index) => <a>{++index}</a>,
    },
    {
      title: "Người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Thời gian",
      key: "updatedAt",

      dataIndex: "updatedAt",
      render: (text) => <a>{new Date(text).toLocaleDateString("vi-VN")}</a>,
    },
    {
      title: "Xóa",

      render: (text, record) => {
        return (
          <Button
            type="dashed"
            danger
            onClick={() => {
              confirm(text.id, id);
            }}
            icon={<DeleteOutlined />}
          ></Button>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(actionCommentBlogGets({ idBlog: id }));
  }, []);

  return (
    <Table
      className="w-2/3 m-auto"
      columns={columns}
      dataSource={commentBlogs.map((item) => ({
        ...item,
        key: item.id,
        username: item.UserCommentBlog?.username,
      }))}
    />
  );
};

export default CommentBlog;
