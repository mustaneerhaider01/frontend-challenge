import axios from "axios";

const newRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});

export default newRequest;
