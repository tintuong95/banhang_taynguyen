import {
  Space,
  Table,
  Tag,
  Switch,
  Button,
  Row,
  Col,
  Input,
  Modal,
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
  actionBlogsChangeStatus,
  actionBlogsGets,
  actionBlogsRemove,
  actionBlogsUpdate,
} from "../modules/blog/action";
import history from "../utils/history.js";
import { refeshBlogs } from "../modules/blog/reducer.js";

const Blogs = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blogReducer.blogs);
  //search name
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState(null);

  //modal delete product
  const confirm = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn xóa bài này !",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        dispatch(actionBlogsRemove({ id }));
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
      render: (text, record, index) => (
        <img src={text || require("../assets/image/noimage.png")} alt={record.title} className="photo" />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "25%",
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
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text, record, index) => {
        return (
          <Switch
            onChange={() => {
              dispatch(actionBlogsChangeStatus({ id: record.id }));
            }}
            defaultChecked={text == "0" ? false : true}
          />
        );
      },
      sorter: (a, b) => {
        return Number(a) > Number(b);
      },
    },

    {
      title: "Bình luận",
      key: "BlogComment",

      dataIndex: "BlogComment",
      render: (text, record) => (
        <NavLink
          to={{
            pathname: "/comment/blogs/" + record.id,
          }}
        >
          <Button type="link">{text.length} bình luận</Button>
        </NavLink>
      ),
    },
    {
      title: "Thời gian",
      key: "updatedAt",

      dataIndex: "updatedAt",
      render: (text) => <a>{new Date(text).toLocaleDateString("vi-VN")}</a>,
    },
    {
      title: "Sửa",
      render: (text, record) => (
        <Link
          to={{
            pathname: "/update-blog/" + record.id,
           
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
            confirm(text.id);
          }}
          icon={<DeleteOutlined />}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actionBlogsGets({ limit: 10, offset }));
    return ()=>{
      dispatch(refeshBlogs());
    }
  }, []);

  //console.log(blogs);
  return (
    <>
      <Row justify="space-between">
        <Col>
          <Button
            onClick={() => {
              history.push("/create-blog");
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
                dispatch(refeshBlogs())
                dispatch(actionBlogsGets({limit:10,offset:0,search}))
                setOffset(0)
              }}
              type="primary"
            >
              Tìm kiếm
            </Button>
          </div>
        </Col>
      </Row>

      <div className="my-4"></div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={posts.map((item, index) => {
          return {
            ...item,
            key: item.id,
          };
        })}
      />
      <div className="my-4" onClick={()=>{
        if(search){
          dispatch(actionBlogsGets({ limit: 10, offset: offset + 10,search }));
        }else{
          dispatch(actionBlogsGets({ limit: 10, offset: offset + 10 }));
        }
        setOffset(offset+10)
      }}><button>Xem thêm</button></div>
    </>
  );
};

export default Blogs;
