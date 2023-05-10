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
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  actionUserChangeStatus,
  actionUserGets,
  actionUserRemove,
} from "../modules/user/action.js";
import { refeshUsers } from "../modules/user/reducer.js";

const Users = () => {
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
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
        dispatch(actionUserRemove({ id }));
      },
    });
  };
  const columns = [
    {
      title: "#",

      render: (text, record, index) => <a>{++index}</a>,
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",

      sorter: (a, b) => {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => {
        if (a.fullname < b.fullname) {
          return -1;
        }
        if (a.fullname > b.fullname) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",

      sorter: (a, b) => {
        if (a.phone < b.phone) {
          return -1;
        }
        if (a.phone > b.phone) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
      sorter: (a, b) => {
        if (a.address < b.address) {
          return -1;
        }
        if (a.address > b.address) {
          return -1;
        }
        return 0;
      },
    },

    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text, record) => {
        console.log(record);
        return (
          <Switch
            onChange={() => {
              dispatch(actionUserChangeStatus({ id: record.id }));
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
      title: "Loại",
      key: "type",
      dataIndex: "type",
      

    },
    {
      title: "Thời gian",
      key: "updatedAt",

      dataIndex: "updatedAt",
      render: (text) => <a>{new Date(text).toLocaleDateString("vi-VN")}</a>,
    },
    {
      title: "Xóa",
      render: (text, record, index) => {
        return (
          <Button
            type="dashed"
            danger
            onClick={() => {
              confirm(text.id);
            }}
            icon={<DeleteOutlined />}
          ></Button>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(actionUserGets({ limit: 10, offset }));
    return ()=>{
      dispatch(refeshUsers())
    }
  }, []);
  console.log("users", users);
  return (
    <>
      <Row justify="space-between">
        <Col></Col>
        <Col>
          <div className="flex gap-2">
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Nhập tên tài khoản"
            />
            <Button
              onClick={(e) => {
                dispatch(refeshUsers());
                dispatch(actionUserGets({ limit: 10, offset: 0, search }));
                setOffset(0);
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
        dataSource={users.map((item) => ({
          ...item,
          key: item.id,
        }))}
      />
      <div className="my-4">
        <button
          onClick={() => {
            if (search) {
              dispatch(
                actionUserGets({ limit: 10, offset: offset + 10, search })
              );
            } else {
              dispatch(actionUserGets({ limit: 10, offset: offset + 10 }));
            }
            setOffset(offset + 10);
          }}
        >
          Xem thêm
        </button>
      </div>
    </>
  );
};

export default Users;
