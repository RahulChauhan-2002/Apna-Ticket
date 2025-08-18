import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});