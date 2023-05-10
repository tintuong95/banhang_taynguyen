import fetchAxios from "../../configs/axios.js";

async function fetchAdminProfile() {
  return await fetchAxios({
    method: "get",
    url: "/admin/profile",
  });
}

async function fetchAdminLogin(payload) {
  return await fetchAxios({
    method: "post",
    url: "/admin/login",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: payload,
  });
}

export { fetchAdminProfile, fetchAdminLogin };
