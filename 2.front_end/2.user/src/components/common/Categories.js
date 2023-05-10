import Link from 'next/link.js';
import React from 'react';

const Categories = ({data}) => {
    return (
      <div className="border   border-dashed border-teal-500 border-b-0 ">
        <div className="border-b border-dashed border-b-teal-300 p-2 ">
          <h4>Danh mục sản phẩm</h4>
        </div>
        <div className="">
          <ul>
            {data?.map((item) => (
              <li
                className="border-b border-dashed border-b-teal-300 p-2 "
                key={item.id}
              >
                <Link
                  href={{
                    pathname: "/san-pham/",
                    query: { id: item.id, name: item.name },
                  }}
                >
                  <a>{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Categories;
