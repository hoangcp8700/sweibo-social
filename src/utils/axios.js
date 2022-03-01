import axios from "axios";

const ENDPOINT = `${process.env.REACT_APP_API_URL}api`;

const axiosInstance = axios.create({
  baseURL: ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (response) => {
    const token = localStorage.getItem("accessToken");
    if (!token) localStorage.removeItem("accessToken");
    response.headers.authorization = token ? `Bearer ${token}` : "";
    return response;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
