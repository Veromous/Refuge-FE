import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

// A read-only value (wallet address, phone number, ...) with a copy button.
export default function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard access can be blocked; fail quietly.
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <code className="flex-1 break-all text-sm text-slate-700">{value}</code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy to clipboard"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
      >
        {copied ? <Check className="h-4 w-4 text-hope-600" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}
