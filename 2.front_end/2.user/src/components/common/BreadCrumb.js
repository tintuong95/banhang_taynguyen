import React from 'react';

const BreadCrumb = ({data}) => {
 
    return (
      <div className="">
        {data.map((item, index) => {
            if(item){
                return (
                  <span
                    className="  font-light mr-2 "
                    key={index}
                  >
                    {item}
                  </span>
                );
            }
        })}
      </div>
    );
}

export default BreadCrumb;
