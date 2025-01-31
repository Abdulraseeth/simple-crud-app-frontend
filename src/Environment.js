import axios from "axios";

const api = axios.create({
  baseURL:
    "https://simple-crud-app-backend-5wgscckg6-abdulraseeths-projects.vercel.app/",
  // baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
