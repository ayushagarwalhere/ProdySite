import { api } from "./client"

export const getLeaderboard = async (eventId: string) => {
  const res = await api.get(`/leaderboard/${eventId}`)
  return res.data
}
