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

/* ─────────────────────────────────────────────────────────────────────────────
   RAW SHAPES — exactly what the backend returns, no assumptions
───────────────────────────────────────────────────────────────────────────── */

type RawUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string | null;
};

type RawMember = {
  id: string;         // TeamMember row id
  userId: string;
  teamId: string;
  createdAt: string;
  user: RawUser;      // nested user object
};

type RawTeamSize = {
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
  adminId: string;        // use this to derive isUserAdmin
  registered: boolean;
  memberCount: number;
  members: RawMember[];
  teamSize: RawTeamSize;
  eventId: string;
  createdAt: string;
  updatedAt: string;
};

/* ─────────────────────────────────────────────────────────────────────────────
   NORMALISED SHAPES — what the UI actually uses
───────────────────────────────────────────────────────────────────────────── */

export type Member = {
  memberId: string;   // TeamMember row id
  userId: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  isAdmin: boolean;
};

export type TeamSize = {
  current: number;
  min: number;
  max: number;
  canJoin: boolean;
  canRegister: boolean;
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
  | { hasTeam: true; team: Team };

/* ─────────────────────────────────────────────────────────────────────────────
   NORMALISE  — flatten members[].user and derive isUserAdmin from adminId
───────────────────────────────────────────────────────────────────────────── */

function normalise(raw: RawTeam, currentUserId?: string): Team {
  const isUserAdmin = currentUserId
    ? raw.adminId === currentUserId
    : raw.isUserAdmin as unknown as boolean ?? false;   // fallback if backend ever adds it

  return {
    id: raw.id,
    name: raw.name,
    teamCode: raw.teamCode,
    adminId: raw.adminId,
    registered: raw.registered,
    memberCount: raw.memberCount,
    isUserAdmin,
    teamSize: raw.teamSize,
    members: raw.members.map(m => ({
      memberId: m.id,
      userId: m.userId,
      name: m.user.name,
      username: m.user.username,
      email: m.user.email,
      avatarUrl: m.user.avatarUrl,
      isAdmin: m.userId === raw.adminId,
    })),
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROUTES
───────────────────────────────────────────────────────────────────────────── */

// GET /teams/event/:eventId
export async function checkTeamForEvent(
  eventId: string,
  currentUserId?: string,
): Promise<CheckTeamResponse> {
  const { data } = await api.get<{ hasTeam: boolean; team: RawTeam | null }>(
    `/teams/event/${eventId}`,
  );
  if (!data.hasTeam || !data.team) return { hasTeam: false, team: null };
  return { hasTeam: true, team: normalise(data.team, currentUserId) };
}

// POST /teams/create  — { name, eventId }
export async function createTeam(
  name: string,
  eventId: string,
  currentUserId?: string,
): Promise<Team> {
  const { data } = await api.post<RawTeam>("/teams/create", { name, eventId });
  return normalise(data, currentUserId);
}

// POST /teams/join  — { teamCode }
export async function joinTeam(
  teamCode: string,
  currentUserId?: string,
): Promise<Team> {
  const { data } = await api.post<RawTeam>("/teams/join", { teamCode });
  return normalise(data, currentUserId);
}

// POST /teams/leave  — { teamId }
export const leaveTeam = (teamId: string) =>
  api.post("/teams/leave", { teamId });

// POST /teams/remove-member  — { teamId, userId }
export const removeMember = (teamId: string, userId: string) =>
  api.post("/teams/remove-member", { teamId, userId });

// GET /teams/:teamId
export async function getTeam(
  teamId: string,
  currentUserId?: string,
): Promise<Team> {
  const { data } = await api.get<RawTeam>(`/teams/${teamId}`);
  return normalise(data, currentUserId);
}

// POST /teams/delete  — { teamId }
export const deleteTeam = (teamId: string) =>
  api.post("/teams/delete", { teamId });
