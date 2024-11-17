import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo?.refreshToken) {
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(new Error("No refresh token available"));
        }

        const response = await axios.post(`${url}/auth/refresh-token`, {
          refreshToken: userInfo.refreshToken,
        });

        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        const updatedUserInfo = {
          ...userInfo,
          refreshToken: refreshToken,
        };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        isRefreshing = false;
        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error, null);
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
