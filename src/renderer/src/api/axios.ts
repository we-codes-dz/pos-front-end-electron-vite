import axios from "axios";
// const BASE_URL = 'https://koralandacad.link/api/v1';
const BASE_URL = "http://localhost:3000";
// const BASE_URL = 'http://192.168.1.5:8000/api/v1';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
