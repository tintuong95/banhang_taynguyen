import fetchAxios from "../../configs/axios";

async function fetchRatingsGets(payload) {
  return await fetchAxios({
    method: "get",
    url: "/ratings?idProduct=" + payload.idProduct,
  });
}



async function fetchRatingsRemove(payload) {
  return await fetchAxios({
    method: "delete",
    url: "/ratings/" + payload.id,
  });
}

export { fetchRatingsRemove, fetchRatingsGets };
