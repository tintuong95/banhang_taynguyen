import fetchAxios from "../../configs/axios.js";

async function fetchGroupBlogGets() {
  return await fetchAxios({
    method: "get",
    url: "/group-blog",
  });
}

export { fetchGroupBlogGets };
