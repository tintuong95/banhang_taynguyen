import fetchAxios from "../../configs/axios";

async function fetchBlogsGets(payload) {
  const query = Object.entries(payload)
    .map((item) => item[0] + "=" + item[1])
    .join("&");
  return await fetchAxios({
    method: "get",
    url: "/blog?" + query,
  });
}

async function fetchBlogsChangeStatus(payload) {
  return await fetchAxios({
    method: "get",
    url: "/blog/status/" + payload.id,
  });
}

async function fetchBlogsGet(payload) {
  return await fetchAxios({
    method: "get",
    url: "/blog/" + payload.id,
  });
}

async function fetchBlogsPost(payload) {
  return await fetchAxios({
    method: "post",
    url: "/blog",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
    },
  });
}

async function fetchBlogsUpdate(payload) {
  return await fetchAxios({
    method: "put",
    url: "/blog/" + payload.id,
    data: payload.data,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
    },
  });
}

async function fetchBlogsRemove(payload) {
  return await fetchAxios({
    method: "delete",
    url: "/blog/" + payload.id,
  });
}

export {
  fetchBlogsGets,
  fetchBlogsPost,
  fetchBlogsUpdate,
  fetchBlogsRemove,
  fetchBlogsGet,
  fetchBlogsChangeStatus,
};
