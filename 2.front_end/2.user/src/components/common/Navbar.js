import React, { PureComponent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link.js";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router.js";
import { actionCartGets, actionUserLogout } from "../../store/action.js";

const Navbar = ({ data }) => {
  const { user } = useSelector((state) => state.reducerStore);
  const [visible, setVisible] = useState(true)
  const dispatch = useDispatch();

  const { push } = useRouter();
  const onClick = () => {
    if (!user) {
      return push("/login");
    } else {
      return push("/gio-hang");
    }
  };

  useEffect(() => {
    if (user != null) {
      dispatch(actionCartGets({ id: user.id }));
    }
  }, [user]);

  return (
    <div className="w-full bg-white z-10 mb-4 border-b  shadow-md  ">
      <div className="w-4/5 flex m-auto justify-between">
        <div className=" flex items-center ">
          <Link href={"/"}>
            <a>
              <Image
                src={require("../../assets/images/logo_tnf.png")}
                alt="logo"
                className="logo p-h5 m-0"
                width={240}
                height={60}
              />
            </a>
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          <div className=" gap-5 items-center max-sm:hidden md:hidden sm:hidden  lg:hidden xl:flex">
            <div className=" bg-teal-500 dropdown p-1 px-3 rounded-md border-teal-500  text-white hover:bg-teal-400">
              <div >
                <Link
                  href={{
                    pathname: "/tim-kiem",
                  }}
                >
                  <a className="flex items-center gap-2 " type="button">
                    <Image
                      src={require("../../assets/images/search_icon.png")}
                      width={20}
                      height={20}
                      alt={"icon cart"}
                    />
                    Tìm kiếm
                  </a>
                </Link>

              </div>
            </div>
            <div className=" bg-teal-500 dropdown p-1 px-3 rounded-md border-teal-500  text-white hover:bg-teal-400">
              <div >
                <Link
                  href={{
                    pathname: "/san-pham",
                  }}
                >
                  <a className="flex items-center gap-2 " type="button">
                    <Image
                      src={require("../../assets/images/product.png")}
                      width={20}
                      height={20}
                      alt={"icon cart"}
                    />
                    Sản phẩm
                  </a>
                </Link>
                {/* colappse */}
                <ul className="hidden z-40 shadow-md bg-white w-52 top-8  text-slate-600 ">
                  {data?.map((item) => (
                    <li key={item.id} className="ml-1 p-1 ">
                      <Link
                        href={{
                          pathname: "/san-pham",
                          query: { id: item.id, name: item.name },
                        }}
                      >
                        <a className="hover:text-teal-500" href="#">
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* colappse */}
              </div>
            </div>
            <div className=" bg-teal-500 p-1 px-3 rounded-md border-teal-500 text-white hover:bg-teal-400">
              <Link href={"/tin-tuc"}>
                <a className="flex items-center gap-2" type="button">
                  <Image
                    src={require("../../assets/images/news.png")}
                    width={20}
                    height={20}
                    alt={"icon cart"}
                  />
                  Tin tức
                </a>
              </Link>
            </div>

            <div className=" bg-teal-500 p-1 px-3 rounded-md border-teal-500 text-white hover:bg-teal-400" >
              <div className="badge ">
                <button
                  className="flex items-center gap-2"
                  onClick={onClick}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={require("../../assets/images/cart.png")}
                    width={20}
                    height={20}
                    alt={"icon cart"}
                  />
                  Giỏ hàng
                  {/* <span>({carts?.length})</span> */}
                </button>
              </div>
            </div>

            <div className="">
              {user == null ? (
                <div className=" bg-teal-500 p-1 px-3 rounded-md border-teal-500 text-white hover:bg-teal-400">
                  <Link href={"/login"}>
                    <a className="flex items-center gap-2" type="button">

                      Đăng nhập
                      <Image
                        src={require("../../assets/images/user.png")}
                        width={20}
                        height={20}
                        alt={"icon cart"}
                      />
                    </a>
                  </Link></div>
              ) : (
                <div className=" bg-teal-500 p-1 px-3 rounded-md border-teal-500 text-white dropdown">
                  <div className="">
                    <button className="flex items-center gap-2" type="button">
                      {user?.fullname}
                      <Image
                        src={require("../../assets/images/user.png")}
                        width={20}
                        height={20}
                        alt={"icon cart"}
                      />
                    </button>
                    <ul className="hidden z-40 shadow-md bg-white w-52 top-8  text-slate-600">
                      <div className="ml-1 p-1 mt-2 ">
                        <Link
                          href={{
                            pathname: "/thong-tin",
                          }}
                        >
                          <a className="dropdown-item">Thông tin</a>
                        </Link>
                      </div>
                      <li className="ml-1 p-1 ">
                        <Link
                          href={{
                            pathname: "/lich-su",
                          }}
                        >
                          <a className="dropdown-item">Lịch sử</a>
                        </Link>
                      </li>

                      <li className="ml-1 p-1 mb-2 cursor-pointer">
                        <a
                          className=""
                          onClick={() => {
                            dispatch(actionUserLogout());
                          }}
                        >
                          Đăng xuất &nbsp;

                        </a>
                      </li>
                    </ul>
                  </div></div>
              )}
            </div>
          </div>
          <div className="block xl:hidden" onClick={() => { setVisible(false) }}>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none" stroke="#003580"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>
        </div>
        {visible ? null : (
          <div className="fixed  right-0 bg-gray-100 shadow-md border-l h-screen w-60 z-50 flex flex-col gap-5 pt-5">
            <button className="absolute top-0 left-0 m-2" onClick={() => { setVisible(true) }}>
              <svg xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none" stroke="#003580" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            </button>
            <Link href={"/tim-kiem"}>
              <button>Tìm kiếm</button>
            </Link>
            <Link href={"/san-pham"}>
              <button>Sản phẩm</button>
            </Link>
            <div className="flex flex-col gap-5">
              {data?.map((item) => (
                <button key={item.id} className=" ">
                  <Link
                    href={{
                      pathname: "/san-pham",
                      query: { id: item.id, name: item.name },
                    }}
                  >
                    <a className="hover:text-teal-500" href="#">
                      {item.name}
                    </a>
                  </Link>
                </button>
              ))}
            </div>
            <Link href={"/tin-tuc"}>
              <button>Tin tức</button>
            </Link>
            <Link href={"/goi-hang"}>
              <button>Giỏi hàng</button>
            </Link>

              {user == null ? (
                <Link href={"/dang-nhap"}>
                  <button>Đăng nhập</button>
                </Link>
              ) : (
                <div className="flex flex-col gap-5">
                  <Link
                    href={{
                      pathname: "/thong-tin",
                    }}
                  >
                    <button>Thông tin</button>
                  </Link>
                  <Link
                    href={{
                      pathname: "/lich-su",
                    }}
                  >
                    <button>Lịch sử</button>
                  </Link>
                  <button
                    className=""
                    onClick={() => {
                      dispatch(actionUserLogout());
                    }}
                  >
                    Đăng xuất &nbsp;
                  </button>
                </div>
              )}
            </div>
      
        )}
      </div>
    </div>
  );
};

export default Navbar;
