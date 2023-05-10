import Image from "next/image.js";
import React from "react";
import { useDispatch } from "react-redux";
import {
  actionCartItemDelete,
  actionCartItemUpdate,
} from "../../store/action.js";

const ItemCart = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="border border-b-0 border-gray-100   grid grid-cols-5 m-auto items-center ">
      <div className="p-4 ">
        <div className="border w-16 h-16 border-gray-200  shadow-xl inline-block rounded-full overflow-hidden p-3">
          <Image
            src={props?.ProductCartItem?.image || require("../../assets/images/noimage.png")}
            alt="khoai mo"
            className=" rounded-full "
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-teal-700">
          {props.ProductCartItem?.title.toUpperCase()}
        </div>
        <div className="lg:flex gap-2 md:hidden sm:hidden max-sm:hidden">
          <small className="bg-slate-200 p-1 px-2 rounded text-slate-500 font-semibold">
            {props.ProductCartItem?.sale} %
          </small>

          <small className="bg-gray-100 p-1 px-2 text-slate-500 rounded">
            Hiện còn :{" "}
            {
              props?.amounts.find(
                (item) => item.id == props.ProductCartItem?.id
              )?.amount
            }
          </small>
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="flex gap-2">
            <input
              className="border text-center p-1 mr-3 rounded w-1/2"
              type="number"
              id="number"
              value={props?.quantity}
            />
            <button
              className="bg-slate-100 w-8 h-8 rounded-md "
              onClick={() => {
                dispatch(
                  actionCartItemUpdate({
                    id: props.id,
                    quantity: props.quantity - 1,
                    idUser: props.idUser,
                  })
                );
              }}
              disabled={props.quantity == 0}
            >
              -
            </button>
            <button
              disabled={
                props.quantity ==
                props?.amounts.find(
                  (item) => item.id == props.ProductCartItem?.id
                )?.amount
              }
              className="bg-slate-200 w-8 h-8 rounded-md "
              onClick={() => {
                dispatch(
                  actionCartItemUpdate({
                    id: props.id,
                    quantity: props.quantity + 1,
                    idUser: props.idUser,
                  })
                );
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center  ">
        <button
          className="bg-gray-300 p-1 px-3 flex justify-center gap-3 text-white rounded shadow"
          onClick={() => {
            dispatch(
              actionCartItemDelete({ id: props.id, idUser: props.idUser })
            );
          }}
        >
          <Image
            src={require("../../assets/images/trash.png")}
            width={25}
            height={25}
            alt={"icon cart"}
          />{" "}
          Xóa
        </button>
      </div>
      <div className="font-bold lg:text-2xl md:text-lg sm:text-base text-teal-400 flex justify-end mr-4  ">
        <div>
          {(
            props.quantity * Number(props.ProductCartItem?.price)
          ).toLocaleString("vi-VN")}{" "}
          đ
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
