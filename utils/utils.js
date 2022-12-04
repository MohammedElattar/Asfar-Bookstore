import axios from "axios";

export const apiHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});
