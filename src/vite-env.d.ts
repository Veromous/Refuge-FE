/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Base URL of the backend API origin (no trailing /api). Empty in dev, where
  // Vite proxies /api to the local backend. Set in production hosting.
  readonly VITE_API_URL?: string
  // Google OAuth client id (public).
  readonly VITE_GOOGLE_CLIENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
