import fetchAxios from "../../configs/axios.js";

async function fetchProductGets(payload) {
  const query = Object.entries(payload)
    .map((item) => item[0] + "=" + item[1])
    .join("&");
  return await fetchAxios({
    method: "get",
    url: "/product?" + query,
  });
}



async function fetchProductChangeStatus(payload) {
  return await fetchAxios({
    method: "get",
    url: "/product/status/" + payload.id,
  });
}

async function fetchProductGet(id) {
  return await fetchAxios({
    method: "get",
    url: "/product/" + id,
  });
}

async function fetchProductCreate(payload) {
  return await fetchAxios({
    method: "post",
    url: "/product",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "multipart/form-data",
    },
  });
}

async function fetchProductUpdate({data,id}) {
  return await fetchAxios({
    method: "put",
    url: "/product/" + id,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
    },
  });
}


async function fetchProductRemove(id){
  return await fetchAxios({
    method: "delete",
    url: "/product/" + id,
  });
}

export {
  fetchProductGets,
  fetchProductCreate,
  fetchProductRemove,
  fetchProductGet,
  fetchProductUpdate,
  fetchProductChangeStatus,
};
