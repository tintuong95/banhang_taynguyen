import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const HoTro = () => {
    const [active,setActive]=useState(null)
  return (
    <div className="hn-container mt-4">
      <div className="row w-75">
        <div className="col-3">
          <ul className="list-group">
            
            <li style={{cursor:"point"}} onClick={()=>{setActive(0)}} className={`list-group-item ${active==0?"active":""}`} >Vận chuyển</li>
            <li style={{cursor:"point"}} onClick={()=>{setActive(1)}} className={`list-group-item ${active==1?"active":""}`}>Thanh toán</li>
            <li style={{cursor:"point"}} onClick={()=>{setActive(2)}} className={`list-group-item ${active==2?"active":""}`}>Đổi trả</li>
            <li style={{cursor:"point"}} onClick={()=>{setActive(3)}} className={`list-group-item ${active==3?"active":""}`}>Khuyến mại</li>
          </ul>
        </div>

        <div className="col-9">
            1. Thanh toán tiền mặt tại quầy phuong-thuc-thanh-toan-
            2 Tiền mặt là hình thức thanh toán phổ biến nhất trong bán lẻ 
            Đây là phương thức thanh toán truyền thống và phổ biến mà các 
            cửa hàng bán lẻ vẫn hay sử dụng bởi tính tiện lợi của nó. 
            Không có gì để nói nhiều về cách thanh toán này, chỉ có một số lưu ý b
            ạn cần nhớ như sau: - In hóa đơn và đề nghị khách nhận để tránh 
            tranh chấp sau này - Lắp đặt ngăn kéo đựng tiền với từng ngăn mệnh giá 
            riêng để không bị nhầm lẫn - Kiểm tra kỹ tiền trước khi nhận để tránh 
            tiền giả - Có biện pháp giám sát nhân viên, không cho họ gian lận 
            (rút lõi tiền, nâng giá bán,…): 
            lắp đặt camera, sử dụng phần mềm bán hàng - 
            Yêu cầu khách kiểm tra hàng hóa trước khi mang ra khỏi shop 
        </div>
      </div>
    </div>
  );
};

HoTro.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default HoTro;
