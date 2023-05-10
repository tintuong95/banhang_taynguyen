import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import {
  actionProductChangeStatus,
  actionProductGets,
  actionProductRemove,
} from "../modules/product/action.js";
import history from "../utils/history.js";
import { refeshProducts } from "../modules/product/reducer.js";

const Product = () => {
  const { products } = useSelector((state) => state.productReducer);
  //search name
 
  const [search, setSearch] = useState(null);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  //modal delete product
  const confirm = (id,offset) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn xóa bài này !",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        dispatch(actionProductRemove({ id }));
      },
    });
  };

  const columns = [
    {
      title: "#",

      render: (text, record, index) => <a>{++index}</a>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => <img className="photo" src={text||require("../assets/image/noimage.png")} alt="photo1" />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => {
        return Number(a) > Number(b);
      },
    },
      {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => {
        return Number(a) > Number(b);
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text, record) => {
        return (
          <Switch
            defaultChecked={text == "0" ? false : true}
            onChange={() => {
              dispatch(actionProductChangeStatus({ id: record.id }));
            }}
          />
        );
      },
      sorter: (a, b) => {
        return Number(a) > Number(b);
      },
    },
    {
      title: "Đánh giá",
      key: "ProductRatings",

      dataIndex: "ProductRatings",
      render: (text, record) => {
        return (
          <NavLink
            to={{
              pathname: "/ratings/" + record.id,
            }}
          >
            <Button type="link"> {text.length} đánh giá</Button>
          </NavLink>
        );
      },
    },
    {
      title: "Bình luận",
      key: "ProductComment",

      dataIndex: "ProductComment",
      render: (text, record) => {
        return (
          <NavLink
            to={{
              pathname: "/comment/product/" + record.id,
            }}
          >
            <Button type="link">{text.length} bình luận</Button>
          </NavLink>
        );
      },
    },
    {
      title: "Thời gian",
      key: "updatedAt",

      dataIndex: "updatedAt",
      render: (text) => <a>{new Date(text).toLocaleDateString("vi-VN")}</a>,
    },
    {
      title: "Sửa",
      render: (text) => (
        <Link
          to={{
            pathname: "/update-product/" + text.id,
          }}
        >
          <Button type="dashed" icon={<EditOutlined />}></Button>
        </Link>
      ),
    },
    {
      title: "Xóa",

      render: (text, record) => (
        <Button
          type="dashed"
          danger
          onClick={() => {
            confirm(text.id,offset);
          }}
          icon={<DeleteOutlined />}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actionProductGets({ limit: 10, offset }));
    console.log("products", products)
    return () => {
      dispatch(refeshProducts());
    };
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Button
            onClick={() => {
              history.push("/create-product");
            }}
            type="primary"
          >
            Tạo mới
          </Button>
        </Col>
        <Col>
          <div className="flex gap-2">
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Nhập tên sản phẩm"
            />
            <Button
              onClick={(e) => {
                // setSearch(keySearch);
                dispatch(refeshProducts())
                dispatch(actionProductGets({ limit: 10, offset: 0,search }));
                setOffset(0)
              }}
              type="primary"
            >
              Tìm kiếm
            </Button>
          </div>
        </Col>
      </Row>
      <div className="mt-5">
        <Table
          pagination={false}
          columns={columns}
          dataSource={products.map((item) => ({
            ...item,
            key: item?.id,
          }))}
        
        />
        <div
          className="my-4"
          onClick={() => {
            if(search){
              dispatch(actionProductGets({ limit: 10, offset: offset + 10,search }));
            }else{
              dispatch(actionProductGets({ limit: 10, offset: offset + 10 }));
            }
            setOffset(offset + 10);
          }}
        >
          <button>Xem thêm</button>
        </div>
      </div>
    </>
  );
};

export default Product;
