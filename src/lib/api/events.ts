import { api } from "./client"

export const getEvents = async () => {
  const res = await api.get("/events")
  return res.data
}

export const getEventById = async (eventId: string) => {
  const res = await api.get(`/events/${eventId}`)
  return res.data
}

export const createEvent = async (
  title: string,
  description: string,
  mode: string
) => {
  const res = await api.post("/events", {
    title,
    description,
    mode,
  })
  return res.data
}

export const registerEvent = async (
  eventId: string,
  teamId?: string
) => {
  const res = await api.post(`/events/${eventId}/register`, {
    teamId,
  })
  return res.data
}
