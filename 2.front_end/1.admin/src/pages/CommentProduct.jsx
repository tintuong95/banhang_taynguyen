import { Button, Modal, Space, Table, Tag } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation ,useParams} from "react-router-dom";
import { actionCommentProductGets, actionCommentProductRemove } from "../modules/comment-product/action.js";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";



const CommentProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { commentProducts } = useSelector(
    (state) => state.commentProductReducer
  );

  //modal delete binh luan
  const confirm = (id, idProduct) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn bình luận này !",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
       dispatch( actionCommentProductRemove({ id, idProduct }))
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
      render: (text, record) => (
        <Button
          icon={<DeleteOutlined />}
          type="dashed"
          danger
          onClick={() => {
            dispatch(

              confirm(text.id,id)
             
            );
          }}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actionCommentProductGets({ idProduct: id }));
  }, []);

  return (
    <Table
      className="w-2/3 m-auto"
      columns={columns}
      dataSource={commentProducts.map((item) => ({
        ...item,
        key: item.id,
        username: item.UserCommentProduct?.username,
      }))}
    />
  );
};

export default CommentProduct;
