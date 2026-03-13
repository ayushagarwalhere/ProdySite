import { api } from "./client"

export const getProfile = async () => {
  const res = await api.get("/user/profile")
  return res.data
}
