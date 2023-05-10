import Image from "next/image.js";
import Link from "next/link.js";
import React from "react";
import { useDispatch } from "react-redux";
import { actionBlogView } from "../../store/action.js";

const CardPostSmall = ({
    id,
    title,
    image,
    updatedAt,
    GroupBlogBlog,
    param,
    view,
}) => {
    const dispatch = useDispatch();
    return (
        <div className="border  p-3 rounded border-teal-500 border-dashed">
            <div className="flex gap-3">

                {/* <div className="md:w-1/3 lg:hidden sm:hidden">
                    <Image
                        src={image}
                        alt="logo"
                        className=" overflow-hidden rounded col-span-1 "
                        width={100}
                        height={100}
                    />
                </div> */}
                {/* <span className="blog-content-category">DANH MỤC BÀI VIẾT</span> */}

                <div className=" px-2 flex flex-col justify-between  col-span-3">
                    <Link href={"/tin-tuc/" + param}>
                        <a
                            onClick={() => {
                                dispatch(actionBlogView({ idBlog: id }));
                            }}
                            className=""
                        >
                            <p className="block-ellipsis text-gray-700  font-medium"> {title} </p>
                        </a>
                    </Link>
                    {/* <p className="flex">
                        <small className="flex">
                            <span className="bg-teal-500 text-white p-1 px-2 rounded">
                                
                                {GroupBlogBlog?.name}
                            </span>
                            &nbsp;
                            <div className="flex items-center bg-slate-100 px-2 rounded">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </span>
                                <span className="px-2">{view} </span>
                            </div>
                        </small>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default CardPostSmall;
