import Image from 'next/image.js';
import Link from 'next/link.js';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionBlogView } from '../../store/action.js';

const CardPostMedium = ({id,title, image, updatedAt, GroupBlogBlog,param}) => {
  const dispatch=useDispatch()
    return (
      <div className="mb-2">
        <div className="blog-list-container ">
          <div className="blog-list-header">
            <Image
              src={image || require("../../assets/images/noimage.png")}
              alt="logo"
              className="blog-list-feature-image rounded-1"
              width={200}
              height={150}
            />
            {/* <span className="blog-content-category">DANH MỤC BÀI VIẾT</span> */}
          </div>
          <div className="blog-content " style={{ marginLeft: 10 }}>
            <Link href={"/tin-tuc/" + param}>
              <a
                onClick={() => {
                  dispatch(actionBlogView({ idBlog: id }));
                }}
                className="blog-content-title"
              >
                <small className="block-ellipsis"> {title}</small>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default CardPostMedium;
