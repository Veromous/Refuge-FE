// Thin wrapper around fetch for talking to the backend API.
//
// In development, VITE_API_URL is unset, so requests go to a relative /api path
// and Vite proxies them to the local Express server (see vite.config.ts).
//
// In production, the frontend (Cloudflare) and backend (Back4App/Hostinger) are
// on different origins, so set VITE_API_URL to the backend origin, e.g.
//   VITE_API_URL=https://refugebe-b2uf10m7.b4a.run
// Requests then go to `${VITE_API_URL}/api/...`. Any trailing slash is trimmed.
const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export interface ApiError extends Error {
  status?: number
  details?: unknown
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  // Attach the auth token when present so signed-in donors get linked to their
  // account; guests simply send no token.
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = new Error(body?.message || 'Something went wrong') as ApiError
    err.status = res.status
    err.details = body?.details
    throw err
  }

  return body as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(data ?? {}) }),
}
