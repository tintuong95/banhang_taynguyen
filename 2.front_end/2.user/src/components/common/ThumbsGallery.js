import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";



// import required modules
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";

export default function ThumbsGallery({data}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <img className="m-auto" src={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </>
  );
}
