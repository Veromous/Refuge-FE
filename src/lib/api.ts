// Thin wrapper around fetch for talking to the backend API.
// In dev, Vite proxies /api to the Express server (see vite.config.ts).

export interface ApiError extends Error {
  status?: number
  details?: unknown
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  // Attach the auth token when present so signed-in donors get linked to their
  // account; guests simply send no token.
  const token = localStorage.getItem('token')

  const res = await fetch(`/api${path}`, {
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
