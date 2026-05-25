'use client'

import { useState } from 'react'

export function ResetButton() {
  const [state, setState] = useState<'idle' | 'confirm' | 'loading' | 'done'>('idle')

  const handleClick = async () => {
    if (state === 'idle') {
      setState('confirm')
      setTimeout(() => setState((s) => (s === 'confirm' ? 'idle' : s)), 3000)
      return
    }
    if (state === 'confirm') {
      setState('loading')
      const res = await fetch('/api/reset', { method: 'POST' })
      if (res.ok) {
        setState('done')
        setTimeout(() => window.location.reload(), 600)
      } else {
        setState('idle')
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === 'loading' || state === 'done'}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
        state === 'idle'
          ? 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500'
          : state === 'confirm'
          ? 'border-red-300 text-red-500 bg-red-50 animate-pulse'
          : 'border-gray-100 text-gray-300 cursor-not-allowed'
      }`}
    >
      {state === 'idle' && 'Reset data'}
      {state === 'confirm' && 'Tap again to confirm'}
      {state === 'loading' && 'Resetting…'}
      {state === 'done' && 'Done'}
    </button>
  )
}
