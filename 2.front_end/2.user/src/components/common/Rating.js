import React, { useState } from "react";
import Image from "next/image"
import { useDispatch } from "react-redux";
import { actionRateProductCreate } from "../../store/action.js";

const Rating = ({ idUser, idProduct, rates }) => {
  const [count, setCount] = useState();
  const dispatch = useDispatch();
  const ratingHandler = () => {
    return Math.round(rates.reduce((a, b) => a + b.rate, 0) / rates.length*10)/10;
  };

  const renderStar = (number) => {
    let components = [];
    for (let i = 1; i <= 5; i++) {
      components.push(
        <div>
          <Image onClick={() => { setCount(i) }} className={`${i <= number ? "sepia" :"grayscale"}`} src={require("../../assets/images/icon_star.png")} width={35} height={35} />
        </div>
      );
    }
    return components;
  };
  return (
    <>
      <div className="grid grid-cols-12 border p-5  border-dashed border-teal-500 rounded-md">
        <div className="col-span-2  flex items-center justify-center">
          {ratingHandler()}
        </div>
        <div className="col-span-6 flex justify-center items-center ">{renderStar(count)}</div>
        <div className="col-span-4 flex justify-center items-center ">
          <button
            className=" "
            onClick={() => {
              dispatch(
                actionRateProductCreate({
                  idUser,
                  idProduct,
                  content: "content",
                  rate: count,
                })
              );
            }}
          >
            Đánh giá
          </button>
        </div>
      </div>
    </>
  );
};

export default Rating;
