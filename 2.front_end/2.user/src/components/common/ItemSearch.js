import Image from 'next/image.js';
import Link from 'next/link.js';
import React from 'react';

const ItemSearch = ({ image, title, param }) => {

    return (<Link href={"/san-pham/" + param} >
        <a className="d-flex align-items-center m-2" >
            <Image src={image}
                alt="khoai mo"
                className="pr-10"
                width={80}
                height={60}
            />
            <p> {title} </p>
        </a> </Link>
    );
}

export default ItemSearch;