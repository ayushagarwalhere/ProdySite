import { api } from "./client"

export const createTeam = async (name: string) => {
  const res = await api.post("/teams/create", { name })
  return res.data
}

export const joinTeam = async (teamCode: string) => {
  const res = await api.post("/teams/join", { teamCode })
  return res.data
}

export const removeMember = async (
  teamId: string,
  userId: string
) => {
  const res = await api.post("/teams/remove-member", {
    teamId,
    userId,
  })
  return res.data
}

export const submitTeam = async (teamId: string) => {
  const res = await api.post("/teams/submit", { teamId })
  return res.data
}
