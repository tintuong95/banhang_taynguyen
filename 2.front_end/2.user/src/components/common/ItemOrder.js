import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionOrderCancel, actionOrderGetIdUser } from "../../store/action.js";

const ItemOrder = () => {
  const dispatch = useDispatch();
  const { user, orders } = useSelector((state) => state.reducerStore);

  const statusHandler = (status) => {
    if (status === 0) return "Đang chờ";
    if (status === 1) return "Thành công";
    if (status === -1) return "Đã hủy";
  };

  useEffect(() => {
    dispatch(actionOrderGetIdUser({ idUser: user?.id }));
  }, [user]);


  return (
    <table className="table-fixed border-collapse border border-slate-400  m-auto w-4/5 overflow-scroll overflow-y-auto " >
      <thead>
        <tr>
          <th className="border border-slate-300 p-2"  scope="col">#</th>
          <th  className="border border-slate-300  p-2" scope="col">Mã Đơn Hàng</th>
          <th  className="border border-slate-300 p-2"scope="col">Họ Tên</th>
          <th  className="border border-slate-300 p-2"scope="col">Địa chỉ</th>
          <th  className="border border-slate-300 p-2"scope="col">Tổng tiền</th>
          <th  className="border border-slate-300 p-2"scope="col">Ngày đặt</th>
          <th  className="border border-slate-300 p-2"scope="col">Trạng thái</th>
          <th  className="border border-slate-300 p-2"scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((item, index) => (
          <tr key={item.id}>
            <th className="border border-slate-300 p-2 " scope="row">{++index}</th>
            <td className="border border-slate-300 p-2">
              <p>{item.code}</p>
            </td>
            <td className="border border-slate-300 p-2">
              <p>{item.name}</p>
            </td>
            <td className="border border-slate-300 p-2">
              <p>{item.address}</p>
            </td>
            <td className="border border-slate-300 p-2">
              <p>{item.grandtotal?.toLocaleString("vi-VN")} đ</p>
            </td>
            <td className="border border-slate-300 p-2">
              <p>
                {new Date(item.updatedAt).toLocaleDateString("vi-VN")}
              </p>
            </td>
            <td className="border border-slate-300 p-2">
              <p>{statusHandler(item.status)}</p>
            </td>
            <td className="border border-slate-300 p-2 text-center">
              <p>
                {item.status === 0 ? (
                  <button
                    className="border px-2 bg-slate-500 text-white rounded"
                    onClick={() => {
                      dispatch(actionOrderCancel({ id: item.id,idUser:user?.id }));
                    }}
                  >
                    hủy đơn
                  </button>
                ) : (
                  <button className="border px-2 bg-slate-300 text-white rounded cursor-not-allowed" disabled>hủy đơn</button>
                )}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemOrder;
