import Image from "next/image.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionCartItemCreate,
  actionCartItemUpdate,
  actionProductView,
} from "../../store/action.js";


const CartProduct = ({ id, title, price, image, sale, param }) => {
  const { user, carts } = useSelector((state) => state.reducerStore);
  const { push } = useRouter();
  const dispatch = useDispatch();

  //check cart item exists in cart if it exists update quantity or create cart item new
  const onAddCart = () => {
    let flag = true;
    let cartItem = null;
    carts.forEach((item) => {
      if (id == item.idProduct) {
        flag = false;
        cartItem = item;
      }
    });

    if (!user) {
      return push("/login");
    }

    if (flag) {
      dispatch(
        actionCartItemCreate({ idUser: user.id, idProduct: id, quantity: 1 })
      );
    } else {
      dispatch(
        actionCartItemUpdate({
          id: cartItem.id,
          quantity: cartItem.quantity + 1,
          idUser: cartItem.idUser,
        })
      );
    }
  };

  return (
    <div>
      <div className=" border m-3 p-3 rounded-md shadow-lg border-teal-500 shadow-gray-100 border-dashed relative hover:shadow-lg transition-all ">
        <div className="grid grid-cols-4 gap-3 z-10">
          <div className="col-span-2 flex items-center justify-center relative">
            <Image
              src={image || require("../../assets/images/noimage.png")}
              alt={title}
              className=""
              width={200}
              height={200}
            />
           {
              sale == 0 ? "" : <p
                className="absolute top-0 left-0 
        bg-rose-500 rounded md px-1 font-medium text-white"
              >
                - {sale} %
              </p>
           }
          </div>
          <div className="col-span-2 flex flex-col justify-between ">
            <div>
              <Link
                href={{
                  pathname: "/san-pham/" + param,
                }}
              >
                <div
                  onClick={() => {
                    dispatch(actionProductView({ idProduct: id }));
                  }}
                  className="text-base block-ellipsis text-slate-500 cursor-pointer font-medium"
                >
                  {title.toUpperCase()}
                </div>
              </Link>
              <p className=" flex 2xl:flex-row lg:flex-col sm:flex-col">
              <div className="">
                  <span className="text-white bg-teal-500 px-2 rounded-sm">
                    {price.toLocaleString("vi-VN")}đ
                  </span>
              </div>
               <div className="">
                  <span
                    className="mx-3 text-secondary"
                    style={{ textDecoration: "line-through" }}
                  >
                    <small className="text-slate-500">
                      {(
                        Math.round(((price * sale) / 100 + price) / 1000) * 1000
                      ).toLocaleString("vi-VN")}
                      đ
                    </small>
                  </span>
               </div>
              </p>
            </div>
            <div className="flex justify-end">
         
                <button
                  onClick={onAddCart}
                  className="border p-2 btn-add-cart bg-amber-300 border-amber-300 w-10 
                     h-10 rounded-3xl text-teal-500 flex items-center gap-3 shadow-md "
                >
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="10" cy="20.5" r="1" />
                    <circle cx="18" cy="20.5" r="1" />
                    <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                  </svg>
                </button>
        
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
