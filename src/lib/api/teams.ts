// import { api } from "./client"
//
// export const createTeam = async (name: string, eventId: string) => {
//   const res = await api.post("/teams/create", { name, eventId })
//   return res.data
// }
//
// export const joinTeam = async (teamCode: string) => {
//   const res = await api.post("/teams/join", { teamCode })
//   return res.data
// }
//
// export function removeMember(teamId: string, userId: string): Promise<void> {
//   return api<void>("/teams/remove-member", {
//     method: "POST",
//     body: JSON.stringify({ teamId, userId }),
//   });
// }
//
// export const submitTeam = async (teamId: string) => {
//   const res = await api.post("/teams/submit", { teamId })
//   return res.data
// }
//
// export const checkTeamForEvent = async (eventId: string) => {
//   const res = await api.get(`/teams/event/${eventId}`);
//   return res.data; // { hasTeam: boolean, team: TeamInfo | null }
// };
//
// export const getTeamById = async (teamId: string) => {
//   const res = await api.get(`/teams/${teamId}`);
//   return res.data;
// };


/**
 * teamRoutes.ts
 *
 * All routes match the backend exactly as documented.
 * Base URL is read from NEXT_PUBLIC_API_URL (falls back to http://localhost:3000).
 * Cookies are sent automatically because credentials: "include" is set on every call.
 */

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  withCredentials: true,
});

/* ── Raw shapes (exactly what backend returns) ── */

type RawUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string | null;
};

type RawMember = {
  id: string;       // TeamMember row id
  userId: string;
  teamId: string;
  createdAt: string;
  user: RawUser;
};

export type TeamSize = {
  current: number;
  min: number;
  max: number;
  canJoin: boolean;
  canRegister: boolean;
};

type RawTeam = {
  id: string;
  name: string;
  teamCode: string;
  adminId: string;
  registered: boolean;
  memberCount: number;
  isUserAdmin: boolean;   // backend derives this from cookie session
  members: RawMember[];
  teamSize: TeamSize;
};

/* ── Normalised shape the UI uses ── */

export type Member = {
  memberId: string;
  userId: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  isAdmin: boolean;
};

export type Team = {
  id: string;
  name: string;
  teamCode: string;
  adminId: string;
  registered: boolean;
  memberCount: number;
  isUserAdmin: boolean;
  members: Member[];
  teamSize: TeamSize;
};

export type CheckTeamResponse =
  | { hasTeam: false; team: null }
  | { hasTeam: true;  team: Team };

/* ── Normalise: flatten members[].user, derive isAdmin from adminId ── */

function normalise(raw: RawTeam): Team {
  return {
    id:          raw.id,
    name:        raw.name,
    teamCode:    raw.teamCode,
    adminId:     raw.adminId,
    registered:  raw.registered,
    memberCount: raw.memberCount,
    isUserAdmin: raw.isUserAdmin,   // straight from backend, no derivation needed
    teamSize:    raw.teamSize,
    members:     raw.members.map(m => ({
      memberId:  m.id,
      userId:    m.userId,
      name:      m.user?.name     ?? "",
      username:  m.user?.username ?? "",
      email:     m.user?.email    ?? "",
      avatarUrl: m.user?.avatarUrl ?? null,
      isAdmin:   m.userId === raw.adminId,
    })),
  };
}

/* ── Routes ── */

export const checkTeamForEvent = (eventId: string) =>
  api.get<{ hasTeam: boolean; team: RawTeam | null }>(`/teams/event/${eventId}`)
    .then(r => r.data.hasTeam && r.data.team
      ? { hasTeam: true  as const, team: normalise(r.data.team) }
      : { hasTeam: false as const, team: null });

export const createTeam = (name: string, eventId: string) =>
  api.post<RawTeam>("/teams/create", { name, eventId }).then(r => normalise(r.data));

export const joinTeam = (teamCode: string) =>
  api.post<RawTeam>("/teams/join", { teamCode }).then(r => normalise(r.data));

export const leaveTeam = (teamId: string) =>
  api.post("/teams/leave", { teamId });

export const removeMember = (teamId: string, userId: string) =>
  api.post("/teams/remove-member", { teamId, userId });

export const getTeam = (teamId: string) =>
  api.get<RawTeam>(`/teams/${teamId}`).then(r => normalise(r.data));

export const deleteTeam = (teamId: string) =>
  api.post("/teams/delete", { teamId });