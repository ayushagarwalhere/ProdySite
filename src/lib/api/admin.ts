import { api } from "./client"

export const setScore = async (
  eventId: string,
  teamId: string,
  value: number
) => {
  const res = await api.post("/admin/score", {
    eventId,
    teamId,
    value,
  })
  return res.data
}
