import axios from "axios";

const api = axios.create({
  baseURL:
    "https://simple-crud-app-backend-6icwwcf1w-abdulraseeths-projects.vercel.app",
  // baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
