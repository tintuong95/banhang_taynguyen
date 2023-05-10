import fetchAxios from "../../configs/axios.js";

async function fetchUserGets(payload) {
    const query = Object.entries(payload)
        .map((item) => item[0] + "=" + item[1])
        .join("&");
    return await fetchAxios({
        method: "get",
        url: "/user?" + query,
    });
}


async function fetchUserChangeStatus(payload) {
    return await fetchAxios({
        method: "get",
        url: "/user/status/" + payload.id,
    });
}

// async function fetchProductGet(id) {
//   return await fetchAxios({
//     method: "get",
//     url: "/product/" + id,
//   });
// }

// async function fetchProductCreate(payload) {
//   return await fetchAxios({
//     method: "post",
//     url: "/product",
//     data: payload,
//     headers: {
//       "Content-Type": "multipart/form-data",
//       "Accept": "multipart/form-data",
//     },
//   });
// }

// async function fetchProductUpdate({data,id}) {
//   return await fetchAxios({
//     method: "put",
//     url: "/product/" + id,
//     data: data,
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Accept: "multipart/form-data",
//     },
//   });
// }


async function fetchUserRemove(id) {
    return await fetchAxios({
        method: "delete",
        url: "/user/" + id,
    });
}

export { fetchUserGets, fetchUserRemove, fetchUserChangeStatus };