import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api } from '../lib/api'
import type { ApiError } from '../lib/api'

export interface User {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  provider: string
  role: string
  createdAt: string
}

interface AuthResult {
  success: boolean
  user: User
  token: string
}

interface MeResult {
  success: boolean
  user: User
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginWithGoogle: (accessToken: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

// The last known user, cached so a page refresh can show the signed-in state
// immediately instead of flashing "logged out" while /auth/me is re-checked.
function readCachedUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Hydrate synchronously from cache so the first render is already correct.
  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem(TOKEN_KEY) ? readCachedUser() : null,
  )
  const [loading, setLoading] = useState(() => !!localStorage.getItem(TOKEN_KEY))

  // On first load, silently revalidate the cached session against the server.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    let cancelled = false
    api
      .get<MeResult>('/auth/me')
      .then((res) => {
        if (cancelled) return
        setUser(res.user)
        localStorage.setItem(USER_KEY, JSON.stringify(res.user))
      })
      .catch((err: ApiError) => {
        if (cancelled) return
        // Only sign out when the token is genuinely rejected (401). A network
        // hiccup or server error should NOT drop a valid session.
        if (err?.status === 401) {
          localStorage.removeItem(TOKEN_KEY)
          localStorage.removeItem(USER_KEY)
          setUser(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  function persist(res: AuthResult) {
    localStorage.setItem(TOKEN_KEY, res.token)
    localStorage.setItem(USER_KEY, JSON.stringify(res.user))
    setUser(res.user)
  }

  async function login(email: string, password: string) {
    persist(await api.post<AuthResult>('/auth/login', { email, password }))
  }

  async function register(name: string, email: string, password: string) {
    persist(await api.post<AuthResult>('/auth/register', { name, email, password }))
  }

  async function loginWithGoogle(accessToken: string) {
    persist(await api.post<AuthResult>('/auth/google', { accessToken }))
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
