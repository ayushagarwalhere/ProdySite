import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // important for cookies
  headers: {
    "Content-Type": "application/json",
  },
})
