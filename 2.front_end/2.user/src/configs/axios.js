import axios from "axios";

const axiosServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}/api`,
});

const axiosClient = axios.create({
  baseURL: "/api",
});

axiosServer.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosServer, axiosClient };
