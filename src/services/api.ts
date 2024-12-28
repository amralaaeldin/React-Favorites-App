import axios from "axios";
import { message } from "antd";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
  },
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const errorCode = error.response.status;

  if (errorCode === 401 || (errorCode === 500 && error.response && error.response.data && error.response.data.message && error.response.data.message == 'UNAUTHORIZED EXCEPTION')) {
    window.location.href = '/login';
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('accessToken');
  } else if (errorCode === 400) {
    const errMessage = error.response.data.error.message;
    message.error(errMessage);
  } else if (errorCode === 403) {
    const errMessage = error.response.data.error.message;
    message.error(errMessage);
  } else if (errorCode === 404) {
    const errMessage = error.response.data.error.message;
    message.error(errMessage);
  }

  return Promise.reject(error.response);
});

export default api;