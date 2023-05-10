import Layout from "../components/Layout/Layout.js";
import ListProduct from "../components/common/ListProduct.js";
import useSWR from "swr";
import { axiosClient } from "../configs/axios.js";
import ListPosts from "../components/common/ListPosts.js";
import banner_one from "../assets/images/banner_one.png"
import banner_two from "../assets/images/banner_two.png"
import banner_three from "../assets/images/banner_three.png"
import Carousel from "../components/common/Carousel.js";

const fetcher = (URL) => {
  return axiosClient({
    method: "GET",
    url: URL,
  });
};


export default function Home() {
  const { data: groupProduct } = useSWR("/group-product", fetcher);

  return (
    <>
      <div className="grid grid-cols-5 w-4/5 m-auto gap-5 pt-5">
      
        <div className="col-span-5">
          <Carousel
            data={[banner_one, banner_two, banner_three]}
            width={1520}
            height={250}
          />
        </div>
      </div>

      <div className="mt-6">
        {groupProduct?.data?.map((item) => (
          <ListProduct {...item} key={item.id} />
        ))}
        <ListPosts />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
