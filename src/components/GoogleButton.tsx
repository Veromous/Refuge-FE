import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/AuthContext'

interface GoogleButtonProps {
  label: string
  onSuccess: () => void
  onError: (message: string) => void
}

// Custom-styled "Continue with Google" button. Uses the implicit OAuth flow to
// obtain an access token, which the backend validates (audience-checked) before
// signing the user in. The colored Google mark comes from react-icons (FcGoogle).
export default function GoogleButton({ label, onSuccess, onError }: GoogleButtonProps) {
  const { loginWithGoogle } = useAuth()

  const start = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await loginWithGoogle(response.access_token)
        onSuccess()
      } catch (err) {
        onError(err instanceof Error ? err.message : 'Google sign-in failed')
      }
    },
    onError: () => onError('Google sign-in was cancelled or failed'),
  })

  return (
    <button
      type="button"
      onClick={() => start()}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 px-8 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
    >
      <FcGoogle className="h-5 w-5" />
      {label}
    </button>
  )
}
