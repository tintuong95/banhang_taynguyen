import { axiosClient } from "../configs/axios.js";

export const fetchUserLogin = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/user/login",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  });
};

export const fetchUserSignup = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/user/signup",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  });
};

export const fetchUserCookie = (payload) => {
  return axiosClient({
    method: "GET",
    url: "/user/cookies",
  });
};

export const fetchCartGet = (payload) => {
  return axiosClient({
    method: "GET",
    url: "/cart-item?limit=1000&offset=0&idUser=" + payload.id,
  });
};

export const fetchCartItemDelete = (payload) => {
  return axiosClient({
    method: "DELETE",
    url: "/cart-item/" + payload.id,
  });
};

export const fetchCartItemUpdate = (payload) => {
  return axiosClient({
    method: "PUT",
    url: "/cart-item/" + payload.id,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  });
};

export const fetchCartItemCreate = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/cart-item",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  });
};

export const fetchCartCreate = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/order",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  });
};

export const fetchCommentBlogCreate = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/comment-blog",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  });
};

export const fetchCommentBlog = (payload) => {
  return axiosClient({
    method: "GET",
    url: "/comment-blog?idBlog=" + payload.idBlog,
  });
};

export const fetchCommentProductCreate = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/comment-product",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  });
};

export const fetchCommentProduct = (payload) => {
  return axiosClient({
    method: "GET",
    url: "/comment-product?idProduct=" + payload.idProduct,
  });
};

export const fetchRateProductCreate = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/ratings",
    data: payload,
  });
};

export const fetchOrderGetIdUser = (payload) => {
  return axiosClient({
    method: "GET",
    url: "/order?idUser=" + payload.idUser,
  });
};

export const fetchOrderCancel = (payload) => {
  return axiosClient({
    method: "PUT",
    url: "/order/" + payload.id,
    data: {
      status: -1,
    },
  });
};

export const fetchUserLogout = () => {
  return axiosClient({
    method: "GET",
    url: "/user/logout",
  });
};


export const fetchPaymentVnpay = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/payment",
    data: payload,
  });
};


export const fetchBlogView = (payload) => {
  return axiosClient({
    method: "GET",
    url: "/blog/" + payload.idBlog+"/view",
  });
};


export const fetchProductView = (payload) => {
  return axiosClient({
    method: "GET",
    url: "/product/" + payload.idProduct + "/view",
  });
};

export const fetchProductListAmount = (payload) => {
  return axiosClient({
    method: "POST",
    url: "/product/list",
    data:payload
  });
};

export const fetchProductList =(payload)=>{
  return axiosClient({
    method:"GET",
    url:payload.url,
  })
}

export const fetchNewsList = (payload) => {
  return axiosClient({
    method: "GET",
    url: `/blog?limit=${payload.limit}&offset=${payload.offset}`
  });
};


export const fetchUpdateUser = (payload) => {
  return axiosClient({
    method: "PUT",
    url: "/user/" +payload.id,
    data:payload.body
  });
};





