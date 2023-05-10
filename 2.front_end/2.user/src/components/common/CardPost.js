import Image from 'next/image.js';
import Link from 'next/link.js';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionBlogView } from '../../store/action.js';

const CardPost = ({id,param,title, description, image, updatedAt, GroupBlogBlog,view}) => {
  const dispatch=useDispatch()
    return (
      <>
        <li className=" border border-teal-500  p-4 rounded border-dashed
         ">
          <div className="flex md:flex-row  sm:flex-col  max-sm:flex-col ">
            <div className="md:w-1/3 sm:w-full">
              <Image
                src={image || require("../../assets/images/noimage.png")}
                alt={title}
                className="rounded object-cover sm:h-full  "
                width={200}
                height={130}
                layout={"responsive"}
              />
            </div>
            <div className=" md:w-2/3 px-3 flex flex-col justify-between md:mt-0 max-sm:mt-5 sm:mt-5" >
              <div>
                <Link href={"/tin-tuc/" + param}>
                  <a
                    className="font-semibold text-gray-700 text-overflow-hidden text-2-line"
                    onClick={() => {
                      dispatch(actionBlogView({ idBlog: id }));
                    }}
                  >
                    {title}
                  </a>
                 
                </Link>
                <p className="text-gray-500  text-3-line text-overflow-hidden">{description}</p>
              </div>
              <p className="mt-2">
                <small className="flex  sm:gap-3">
                  <span className="bg-teal-500  text-sm px-2 sm:py-1 text-white rounded-sm">
                    {GroupBlogBlog.name}
                  </span>
            
                  <div className="flex items-center bg-slate-100  sm:py-1 px-2 rounded text-slate-500">
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
                    <span className="px-2">{view}</span>
                  </div>
                </small>
              </p>
            </div>
          </div>
        </li>
      </>
    );
}

export default CardPost;
