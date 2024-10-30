import axios from "axios";
const baseURL = "http://localhost:3000";
/* const controller = new AbortController(); */
export const axiosInstance = axios.create({
  // signal: controller.signal,
  baseURL,
  // withCredentials: true,
});
