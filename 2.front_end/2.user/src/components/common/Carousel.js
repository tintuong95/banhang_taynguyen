import Image from "next/image.js";
import React from "react";
import { Swiper, SwiperSlide, } from "swiper/react";

import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

// setup autoplay slide
SwiperCore.use(Autoplay);

const Carousel = ({ data, width, height }) => {
    return (<Swiper pagination={{ dynamicBullets: true, }}
        loop={true}
        autoplay={{
            delay: 8000,
            disableOnInteraction: false,
        }}
        modules={[Pagination]}
        className="mySwiper " >
        {data?.map((item, index) => (< SwiperSlide key={index} >
            <  Image src={item}
                alt="logo"
                className="m-0"
                width={width}
                height={height}
            /> </SwiperSlide>
        ))}
    </Swiper>
    );
};

export default Carousel;