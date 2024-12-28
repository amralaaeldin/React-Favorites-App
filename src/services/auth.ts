import api from "./api";
import { message } from "antd";

export const refreshAccessToken = async () => {
  try {
    if (
      window.location.href.includes("/login") ||
      window.location.href.includes("/signup")
    ) {
      return;
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      message.error('You are not logged in. Please log in.');
      return 'logout';
    };

    const response = await api.post("/refresh-token", { refreshToken });
    if (response.status !== 200 && response.status !== 201) {
      message.error('Failed to refresh access token. Please log in again.');
      return 'logout';
    }

    const { accessToken } = response.data;

    localStorage.setItem("accessToken", accessToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return accessToken;
  } catch (error) {
    message.error('Failed to refresh access token. Please log in again.');
    return 'logout';
  }
};
