import { api } from "./client"

export const register = async (username: string, name: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { username, name, email, password })
  return res.data
}

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password })
  return res.data
}

export const refresh = async () => {
  const res = await api.post("/auth/refresh")
  return res.data
}

export const logout = async () => {
  const res = await api.post("/auth/logout")
  return res.data
}

export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email })
  return res.data
}

export const resetPassword = async (token: string, password: string) => {
  const res = await api.post("/auth/reset-password", {
    token,
    password,
  })
  return res.data
}

export const verifyEmail = async (token: string) => {
  await api.get(`/auth/verify-email?token=${token}`);
}
