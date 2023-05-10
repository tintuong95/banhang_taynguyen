import Image from "next/image.js";
import React from "react";
import { Navigation } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/react";
import CartProduct from "./CartProduct.js";
const ReProduct = () => {
  return (
    <div className="hn-container">
      <div className="row mt-4">
        <div className="col-12">
          <h3>SẢN PHẨM LIÊN QUAN</h3>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 owl-carousel-products">
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            slidesPerGroup={4}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <CartProduct />
            </SwiperSlide>
            <SwiperSlide>
              <CartProduct />
            </SwiperSlide>
            <SwiperSlide>
              <CartProduct />
            </SwiperSlide>
            <SwiperSlide>
              <CartProduct />
             
            </SwiperSlide>
            <SwiperSlide>
              <CartProduct />
             
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReProduct;
