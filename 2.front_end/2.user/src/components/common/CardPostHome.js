import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { actionBlogView } from "../../store/action";




const CardPostHome = ({id,title, image, updatedAt, GroupBlogBlog,param})=>{
       const dispatch=useDispatch()
    
    return (
      <div className="flex flex-col border p-4 rounded-md border-teal-500 shadow-xl">
        <div className="text-center">
          <Image
            src={image || require("../../assets/images/noimage.png")}
            alt="logo"
            className="rounded "
            width={250}
            height={250}
          />
        </div>
        <div className="">
          <Link href={"/tin-tuc/" + param}>
            <a
              onClick={() => {
                dispatch(actionBlogView({ idBlog: id }));
              }}
              className="flex flex-col justify-between"
            >
              <p className=" text-gray-700 text-2-line"> {title}</p>
              <div>
                <p className="bg-teal-500 text-sm inline-block text-white px-2 rounded-sm mt-3">
                  {GroupBlogBlog.name}
                </p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    );
}


export default CardPostHome