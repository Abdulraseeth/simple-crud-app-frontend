import axios from "axios";

const api = axios.create({
  baseURL: "https://simple-crud-app-backend-kappa.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
})

export default api;