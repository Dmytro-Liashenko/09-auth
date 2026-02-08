import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  api.interceptors.request.use(
    (config) => {
      const cookies = document.cookie.split('; ');
      const accessTokenCookie = cookies.find(row => row.startsWith('accessToken='));
      
      if (accessTokenCookie) {
        const token = accessTokenCookie.split('=')[1];
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}