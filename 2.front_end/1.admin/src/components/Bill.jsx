import React from "react";

const Bill = ({data}) => {
  
  return (
    <div className="w-full p-5 m-auto " style={{ width: 750 ,minHeight:1100}}>
      <div className="relative">
        <p className=" text-center   absolute">Mã đơn :{data?.code}</p>
        <p className="font-semibold text-center text-xl mb-4">
          HÓA ĐƠN BÁN HÀNG
        </p>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <p className="font-medium">Người gửi</p>
          <p>Địa chỉ : Phú Thứ Tây Hòa Phú Yên </p>
          <p>Tên khách hàng : Nguyền Hồng An </p>
          <p>Số điện thoại : 0892308409</p>
        </div>
        <div>
          <p className="font-medium">Người nhận</p>
          <p>Địa chỉ : {data?.address} </p>
          <p>Tên khách hàng : {data?.name} </p>
          <p>Số điện thoại : {data?.phone}</p>
        </div>
      </div>
      <p className="font-medium mt-4">Chi tiết đơn hàng</p>
      <table
        class="w-full text-sm text-left text-gray-500  "
        style={{ width: 700 }}
      >
        <thead class="text-xs text-gray-700 uppercase ">
          <tr>
            <th scope="col" class="py-2   ">
              TÊN SẢN PHẨM
            </th>
            <th scope="col" class="py-2 ">
              SỐ LƯỢNG
            </th>
            <th scope="col" class="py-2   ">
              ĐƠN GIÁ
            </th>
            <th scope="col" class="py-2 ">
              TỔNG
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.OrderOrderItem.map((item,index)=>{
            return (
              <tr key={index} class="border-b border-gray-200 ">
                <th
                  scope="row"
                  class="py-2  font-medium text-gray-900 whitespace-nowrap   "
                >
                  {item?.OrderItemProduct?.title}
                </th>
                <td class="py-2 "> {item?.quantity}</td>
                <td class="py-2   ">
                  {Number(item?.OrderItemProduct?.price).toLocaleString(
                    "vi-VN"
                  )}
                </td>
                <td class="py-2 ">
                  {(
                    item?.OrderItemProduct?.price * item?.quantity
                  ).toLocaleString("vi-VN")}
                </td>
              </tr>
            );
          })}
         

         
        </tbody>
      </table>
      <hr className=" mb-3 mr-4" />
      <p className="font-medium">
        Tổng đơn : {data?.subtotal.toLocaleString("vi-VN")} đ
      </p>
      <p className="font-medium">
        Phí vận chuyển : {data?.shipping.toLocaleString("vi-VN")} đ
      </p>
      <p className="font-medium">
        Khuyến mại : - {data?.discount.toLocaleString("vi-VN")} đ
      </p>

      <p className="font-medium">
        Tổng thang toán :{data?.total.toLocaleString("vi-VN")} đ
      </p>
    </div>
  );
};

export default Bill;
