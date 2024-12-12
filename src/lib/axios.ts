import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
console.log(`API URL: ${baseURL}`);
export const axiosInstance = axios.create({
  baseURL,
});
