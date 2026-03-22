import axios from "axios"

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://prody.nith.ac.in/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})
