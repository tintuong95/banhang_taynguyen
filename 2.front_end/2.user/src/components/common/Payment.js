import Image from "next/image.js";
import React, { useState } from "react";

const Payment = ({ setPaymentType }) => {
  const onChangeRadio = (e) => {
    setPaymentType(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center gap-4 ">
        <input
          type="radio"
          id="NHANHANG"
          name="payment"
          value="NHANHANG"
          onChange={onChangeRadio}
          required
        />
        <Image
          src={require("../../assets/icons/bank_transfer.svg")}
          alt=""
          width={30}
          height={30}
        />
        <label htmlFor="NHANHANG">Thanh toán nhận hàng</label>
      </div>
      <div className="flex items-center gap-4 ">
        <input
          type="radio"
          id="VNPAYQR"
          name="payment"
          value="VNPAYQR"
          onChange={onChangeRadio}
          required
        />
        <Image
          src={require("../../assets/images/vnpay.png")}
          alt=""
          width={80}
          height={20}
        />
        <label htmlFor="VNPAYQR">Thanh toán VNPAYQR</label>
      </div>   
    </div>
  );
};

export default Payment;
