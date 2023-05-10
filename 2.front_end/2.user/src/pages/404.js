import Image from 'next/image.js';
import React from 'react';
import Layout from '../components/Layout/Layout.js';

const NotFound = () => {
    return (
        <div style={{minHeight:500}} className="flex items-center justify-center">
            <Image width={400} height={200} alt="404" src={require("../assets/images/empty.png")} />
        </div>
    );
}
NotFound.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default NotFound;
