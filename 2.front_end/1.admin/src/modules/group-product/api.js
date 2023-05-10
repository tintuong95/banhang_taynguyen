import fetchAxios from "../../configs/axios.js";

async function fetchGroupProductGets() {
  return await fetchAxios({
    method: "get",
    url: "/group-product",
  });
}

export { fetchGroupProductGets };
