'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export function QRDisplay() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.origin)
  }, [])

  if (!url) return null

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="p-5 border border-gray-100 rounded-2xl shadow-sm bg-white">
        <QRCodeSVG
          value={url}
          size={220}
          fgColor="#000000"
          bgColor="#ffffff"
          level="M"
        />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-500 font-medium">Scan to play</p>
        <p className="text-xs font-mono text-gray-300 break-all max-w-[220px]">{url}</p>
      </div>
    </div>
  )
}
