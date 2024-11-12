import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const accessToken = window.localStorage.getItem("accessToken");
  try {
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      return req;
    } else if (req.url === "/auth/login" || req.url === "/auth/register") {
      return req;
    }
  } catch (error) {
    console.log("Error occurs on axios config - ", error);
    return Promise.reject(new Error("No access token available"));
  }
});

export default axiosInstance;
