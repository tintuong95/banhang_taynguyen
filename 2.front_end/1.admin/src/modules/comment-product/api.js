import fetchAxios from "../../configs/axios";

async function fetchCommentProductsGets(payload) {
  return await fetchAxios({
    method: "get",
    url: "/comment-product?idProduct=" + payload.idProduct,
  });
}



async function fetchCommentProductsRemove(payload) {
  return await fetchAxios({
    method: "delete",
    url: "/comment-product/" + payload.id,
  });
}

export { fetchCommentProductsRemove, fetchCommentProductsGets };
