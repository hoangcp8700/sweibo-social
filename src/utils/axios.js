import axios from "axios";

const ENDPOINT = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (response) => {
    // const token = localStorage.getItem('accessToken')
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTZkNTg2ZTU2ZWExMmQ2YjYzYjY4ZSIsImVtYWlsIjoidHVhbmFuaG5nbzI1MTNAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiZnVsbG5hbWUiOiJOZ28gVHVhbiBBbmgiLCJpbWFnZV91cmwiOiJodHRwczovL2VuY3J5cHRlZC10Ym4wLmdzdGF0aWMuY29tL2ltYWdlcz9xPXRibjpBTmQ5R2NRd2JHb3pzUzlRUDEwcDE2clppQ3JRRDBrb1hWa0k0YzdMd1VIYWI5ZGttRlJjTjBWcUNrQjM3ZjJ5MEVueVNJdHd5a2cmdXNxcD1DQVUiLCJpYXQiOjE2Mzg5NTc1ODJ9.UbEQ0GHd4ObN1dd3fEaufHRJH-h78pnFFXIjBEZdRbE`;
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
