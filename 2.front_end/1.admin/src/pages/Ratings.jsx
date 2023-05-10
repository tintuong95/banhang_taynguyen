import { Button, Modal, Space, Table, Tag } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  StarOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  actionRatingsGets,
  actionRatingsRemove,
} from "../modules/ratings/action.js";

const Ratings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ratings } = useSelector((state) => state.ratingsReducer);
  //modal delete ratings
  const confirm = (id, idProduct) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn xóa đánh giá này !",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        dispatch(actionRatingsRemove({ id, idProduct }));
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
      dataIndex: "rate",
      key: "rate",
      render: (text) => {
        let stars = [];
        for (var i = 0; i < text; i++) {
          stars.push(<StarOutlined className="text-yellow-500" />);
        }

        return stars;
      },
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
          type="dashed"
          danger
          onClick={() => {

            confirm(text.id, id);
          
          }}
          icon={<DeleteOutlined />}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actionRatingsGets({ idProduct: id }));
  }, []);

  return (
    <Table
      className="w-2/3 m-auto"
      columns={columns}
      dataSource={ratings.map((item) => ({
        ...item,
        key: item.id,
        username: item.UserRatings.username,
      }))}
    />
  );
};

export default Ratings;
