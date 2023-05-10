import Image from 'next/image.js';
import React from 'react';
import ItemOrder from '../components/common/ItemOrder.js';
import Layout from '../components/Layout/Layout.js';

const LichSu = () => {
  return (
    <div  className=" ">
      <h3 className='mt-10 mb-4 w-4/5 m-auto'>LỊCH SỬ ĐƠN HÀNG</h3>
      <ItemOrder/>
     
    </div>
  );
}
LichSu.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default LichSu;
