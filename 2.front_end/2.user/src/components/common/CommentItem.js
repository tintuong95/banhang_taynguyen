import Image from 'next/image';
import React from 'react';

const CommentItem = ({content,username}) => {
    return (
      <section className='border my-3 p-3 border-teal-100 rounded-md border-dashed'>
   
        <div className="flex items-center gap-4 mb-2 ">
         <Image src={require("../../assets/images/user_comment.png")} width={25} height={25}/>
          <p className="px-0 my-0 ">{username}</p>
        </div>
        <p className='mx-10'>{content}</p>
      </section>
    );
}

export default CommentItem;
