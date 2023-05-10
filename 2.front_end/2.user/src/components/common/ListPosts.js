import React, { useState } from "react"
import useSWR from "swr";
import { axiosClient } from "../../configs/axios";
import CardPostHome from "./CardPostHome";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect } from "react";


const fetcher = (URL) => {
  return axiosClient({
    method: "GET",
    url: URL,
  });
};
const ListPosts = () => {
  const { width } = useWindowSize();
  const [perViews,setPerViews]=useState(6)

  const { data: ListPosts } = useSWR(
    "/blog?limit=12&offset=1",
    fetcher
  );

  useEffect(()=>{ 
    if (width >= 1536){
      setPerViews(6)
    } else if (width < 1536 && width >= 1280){
      setPerViews(4)
    } else if (width < 1280 && width >= 768){
      setPerViews(3)
    }
    else if (width < 768 && width >= 640) {
      setPerViews(2)
    } else {
      setPerViews(1)
    }

  }, [width])

  return (
    <div className=" ">
      <div className="grid grid-cols-5 w-4/5 m-auto">
        <h5 className="text-lg  mb-4 font-bold text-teal-600">
          TIN TỨC
        </h5>
      </div>
      <div className=" w-4/5 m-auto ">
        <Swiper
          slidesPerView={perViews}
          spaceBetween={30}
          slidesPerGroup={2}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {ListPosts?.data?.map((item) => (
            <SwiperSlide><CardPostHome key={item.id} {...item} /></SwiperSlide>
          ))}

        </Swiper>

      </div>
    </div>
  );
}

export default ListPosts
