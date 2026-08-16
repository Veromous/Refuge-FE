import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api } from '../lib/api'

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // On first load, restore the session from a stored token (if any).
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    api
      .get<MeResult>('/auth/me')
      .then((res) => setUser(res.user))
      .catch(() => {
        // Token invalid/expired: clear it and stay logged out.
        localStorage.removeItem(TOKEN_KEY)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  function persist(res: AuthResult) {
    localStorage.setItem(TOKEN_KEY, res.token)
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
