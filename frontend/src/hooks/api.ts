import { KEY_AUTH } from "@/utils/constants";
import axios from "axios";
import cookie from "cookie";

export const useApi = () => {
  const getAuthToken = () => {
    const cookies = cookie.parse(document.cookie)

    const token = cookies[KEY_AUTH]
    return token
  };

  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};
