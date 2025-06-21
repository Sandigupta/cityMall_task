import axios from "axios";

const api = axios.create({
  baseURL: "https://citymall-task-3.onrender.com", // backend running here
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
