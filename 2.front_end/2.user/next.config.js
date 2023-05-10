/** @type {import('next').NextConfig} */




module.exports = {
  env: {
    customKey: "my-value",
    NEXT_PUBLIC_FORM_DISTRICT_SHIPPING:process.env.NEXT_PUBLIC_FORM_DISTRICT_SHIPPING,
    NEXT_PUBLIC_SHOP_ID_SHIPPING:process.env.NEXT_PUBLIC_SHOP_ID_SHIPPING,
    NEXT_PUBLIC_TOKEN_SHIPPING:process.env.NEXT_PUBLIC_TOKEN_SHIPPING,
    NEXT_PUBLIC_URL_SHIPPING: process.env.NEXT_PUBLIC_URL_SHIPPING,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["localhost", "loremflickr.com"] },
};


