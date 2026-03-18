// import { api } from "./client"
//
// export const getEvents = async () => {
//   const res = await api.get("/events")
//   return res.data
// }
//
// export const getEventById = async (eventId: string) => {
//   const res = await api.get(`/events/${eventId}`)
//   return res.data
// }
//
// export const createEvent = async (
//   title: string,
//   description: string,
//   mode: string
// ) => {
//   const res = await api.post("/events", {
//     title,
//     description,
//     mode,
//   })
//   return res.data
// }
//
// export const registerEvent = async (
//   eventId: string,
//   teamId?: string
// ) => {
//   const res = await api.post(`/events/${eventId}/register`, {
//     teamId,
//   })
//   return res.data
// }

/**
 * eventRoutes.ts
 *
 * All routes match the backend exactly as documented.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init.headers },
    ...init,
  });

  if (!res.ok) {
    let msg = res.statusText;
    try {
      const body = await res.json();
      msg = body?.message ?? body?.error ?? msg;
    } catch { /* ignore */ }
    throw new Error(msg);
  }

  if (res.status === 204) return {} as T;
  return res.json() as Promise<T>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

export type ApiEvent = {
  id: string;
  title: string;
  description: string;
  mode: "SOLO" | "TEAM" | "BOTH";
  prizePool?: string;
  minTeamSize?: number;
  maxTeamSize?: number;
  isLive: boolean;
};

export type RegisterResponse = {
  success: boolean;
  message?: string;
};

/* ─────────────────────────────────────────────────────────────────────────────
   ROUTES
───────────────────────────────────────────────────────────────────────────── */

/**
 * GET /events
 */
export function listEvents(): Promise<ApiEvent[]> {
  return api<ApiEvent[]>("/events");
}

/**
 * GET /events/:id
 */
export function getEventById(id: string): Promise<ApiEvent> {
  return api<ApiEvent>(`/events/${id}`);
}

/**
 * POST /events/:eventId/register
 *
 * Single route handles both solo and team registration:
 *   - Solo:  body = {}          (no teamId)
 *   - Team:  body = { teamId }  (team must meet minTeamSize)
 *
 * teamId is null for solo events — we simply omit it from the body.
 */
export function registerEvent(
  eventId: string,
  teamId: string | null
): Promise<RegisterResponse> {
  const body = teamId ? { teamId } : {};
  return api<RegisterResponse>(`/events/${eventId}/register`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
