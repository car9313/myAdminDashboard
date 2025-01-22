import axios from "axios";
/* const baseURL = import.meta.env.VITE_API_URL;
export const axiosInstance = axios.create({
  baseURL,
});
 */
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
